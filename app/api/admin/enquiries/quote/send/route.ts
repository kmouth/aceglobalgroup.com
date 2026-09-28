import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const authClient = await createClient();

    const { data } = await authClient.auth.getClaims();
    const claims = data?.claims ?? null;

    if (!claims) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const formData = await request.formData();

    const quoteId = String(
      formData.get("quoteId") || ""
    ).trim();

    const enquiryReference = String(
      formData.get("enquiryReference") || ""
    ).trim();

    if (!quoteId || !enquiryReference) {
      return NextResponse.json(
        {
          error:
            "Quote ID and enquiry reference are required.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = createAdminClient();

    const { data: quote, error: quoteError } =
      await supabase
        .from("quotes")
        .select(
          "id, reference, status, valid_until"
        )
        .eq("id", quoteId)
        .maybeSingle();

    if (quoteError) {
      console.error(
        "Quote lookup failed:",
        quoteError
      );

      return NextResponse.json(
        {
          error: "Unable to find the quote.",
        },
        {
          status: 500,
        }
      );
    }

    if (!quote) {
      return NextResponse.json(
        {
          error: "Quote not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (quote.status !== "draft") {
      return NextResponse.redirect(
        new URL(
          `/admin/enquiries/${encodeURIComponent(
            enquiryReference
          )}`,
          request.url
        )
      );
    }

    if (
      quote.valid_until &&
      new Date(`${quote.valid_until}T23:59:59Z`) <
        new Date()
    ) {
      await supabase
        .from("quotes")
        .update({
          status: "expired",
        })
        .eq("id", quote.id);

      return NextResponse.redirect(
        new URL(
          `/admin/enquiries/${encodeURIComponent(
            enquiryReference
          )}?quoteError=expired`,
          request.url
        )
      );
    }

    const { error: updateError } =
      await supabase
        .from("quotes")
        .update({
          status: "sent",
        })
        .eq("id", quote.id)
        .eq("status", "draft");

    if (updateError) {
      console.error(
        "Quote send update failed:",
        updateError
      );

      return NextResponse.json(
        {
          error: "Unable to send the quote.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.redirect(
      new URL(
        `/admin/enquiries/${encodeURIComponent(
          enquiryReference
        )}?quoteSent=${encodeURIComponent(
          quote.reference
        )}`,
        request.url
      )
    );
  } catch (error) {
    console.error(
      "Unexpected quote send error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while sending the quote.",
      },
      {
        status: 500,
      }
    );
  }
}