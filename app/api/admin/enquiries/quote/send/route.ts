import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function sendQuote(
  request: Request,
  values: {
    quoteId: string;
    enquiryReference: string;
  }
) {
  try {
    const authClient = await createClient();

    const { data } = await authClient.auth.getClaims();
    const claims = data?.claims ?? null;

    if (!claims) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    const quoteId = values.quoteId.trim();
    const enquiryReference = values.enquiryReference.trim();

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

    /*
     * Load the quote.
     */
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

    /*
     * Prevent sending a quote that has already
     * been sent or processed.
     */
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

    /*
     * Check quote expiry.
     */
    if (
      quote.valid_until &&
      new Date(`${quote.valid_until}T23:59:59Z`) <
        new Date()
    ) {
      const { error: expiryError } =
        await supabase
          .from("quotes")
          .update({
            status: "expired",
          })
          .eq("id", quote.id)
          .eq("status", "draft");

      if (expiryError) {
        console.error(
          "Quote expiry update failed:",
          expiryError
        );
      }

      return NextResponse.redirect(
        new URL(
          `/admin/enquiries/${encodeURIComponent(
            enquiryReference
          )}?quoteError=expired`,
          request.url
        )
      );
    }

    /*
     * Mark quote as sent.
     */
    const { data: updatedQuote, error: updateError } =
      await supabase
        .from("quotes")
        .update({
          status: "sent",
        })
        .eq("id", quote.id)
        .eq("status", "draft")
        .select("id, reference, status")
        .maybeSingle();

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

    /*
     * If no row was updated, another request may
     * have already sent the quote.
     */
    if (!updatedQuote) {
      return NextResponse.redirect(
        new URL(
          `/admin/enquiries/${encodeURIComponent(
            enquiryReference
          )}?quoteError=alreadySent`,
          request.url
        )
      );
    }

    /*
     * Redirect back to the admin enquiry page.
     */
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

/*
 * POST
 *
 * Normal method used by the Send Quote form.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const quoteId = String(
      formData.get("quoteId") || ""
    );

    const enquiryReference = String(
      formData.get("enquiryReference") || ""
    );

    return sendQuote(request, {
      quoteId,
      enquiryReference,
    });
  } catch (error) {
    console.error(
      "Quote send POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process the quote send request.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
 * GET
 *
 * Supported as a fallback so the endpoint does not
 * return HTTP 405 if a browser/redirect reaches the
 * endpoint using query parameters.
 *
 * Example:
 * /api/admin/enquiries/quote/send?quoteId=...&enquiryReference=...
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const quoteId =
      url.searchParams.get("quoteId") || "";

    const enquiryReference =
      url.searchParams.get("enquiryReference") || "";

    return sendQuote(request, {
      quoteId,
      enquiryReference,
    });
  } catch (error) {
    console.error(
      "Quote send GET error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process the quote send request.",
      },
      {
        status: 500,
      }
    );
  }
}