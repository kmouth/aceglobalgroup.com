import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function generateQuoteReference() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);

  return `ACE-QUO-${year}-${random}`;
}

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

    const enquiryReference = String(
      formData.get("enquiryReference") || ""
    ).trim();

    const amountValue = String(
      formData.get("amount") || ""
    ).trim();

    const validUntil = String(
      formData.get("validUntil") || ""
    ).trim();

    const notes = String(
      formData.get("notes") || ""
    ).trim();

    if (!enquiryReference || !amountValue || !validUntil) {
      return NextResponse.json(
        {
          error:
            "Enquiry reference, amount and valid-until date are required.",
        },
        {
          status: 400,
        }
      );
    }

    const amount = Number(amountValue);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          error: "Quote amount must be greater than zero.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = createAdminClient();

    const { data: enquiry, error: enquiryError } =
      await supabase
        .from("enquiries")
        .select("id, reference")
        .eq("reference", enquiryReference)
        .maybeSingle();

    if (enquiryError) {
      console.error(
        "Enquiry lookup failed:",
        enquiryError
      );

      return NextResponse.json(
        {
          error: "Unable to find the enquiry.",
        },
        {
          status: 500,
        }
      );
    }

    if (!enquiry) {
      return NextResponse.json(
        {
          error: "Enquiry not found.",
        },
        {
          status: 404,
        }
      );
    }

    let quoteReference = generateQuoteReference();

    let quoteInsert = await supabase
      .from("quotes")
      .insert({
        reference: quoteReference,
        enquiry_id: enquiry.id,
        amount,
        currency: "NGN",
        valid_until: validUntil,
        status: "draft",
        notes: notes || null,
      })
      .select(
        "id, reference, enquiry_id, amount, currency, valid_until, status, notes, created_at, updated_at"
      )
      .single();

    if (
      quoteInsert.error?.code === "23505"
    ) {
      quoteReference = generateQuoteReference();

      quoteInsert = await supabase
        .from("quotes")
        .insert({
          reference: quoteReference,
          enquiry_id: enquiry.id,
          amount,
          currency: "NGN",
          valid_until: validUntil,
          status: "draft",
          notes: notes || null,
        })
        .select(
          "id, reference, enquiry_id, amount, currency, valid_until, status, notes, created_at, updated_at"
        )
        .single();
    }

    if (quoteInsert.error) {
      console.error(
        "Quote creation failed:",
        quoteInsert.error
      );

      return NextResponse.json(
        {
          error: "Unable to create the quote.",
        },
        {
          status: 500,
        }
      );
    }

    const { error: enquiryUpdateError } =
      await supabase
        .from("enquiries")
        .update({
          status: "quoted",
        })
        .eq("id", enquiry.id);

    if (enquiryUpdateError) {
      console.error(
        "Enquiry status update after quote creation failed:",
        enquiryUpdateError
      );

      return NextResponse.redirect(
        new URL(
          `/admin/enquiries/${encodeURIComponent(
            enquiry.reference
          )}?quoteCreated=${encodeURIComponent(
            quoteReference
          )}&warning=status`,
          request.url
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        `/admin/enquiries/${encodeURIComponent(
          enquiry.reference
        )}?quoteCreated=${encodeURIComponent(
          quoteReference
        )}`,
        request.url
      )
    );
  } catch (error) {
    console.error(
      "Unexpected quote creation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while creating the quote.",
      },
      {
        status: 500,
      }
    );
  }
}