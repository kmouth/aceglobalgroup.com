import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const quoteId = String(
      formData.get("quoteId") || ""
    ).trim();

    const action = String(
      formData.get("action") || ""
    ).trim().toLowerCase();

    if (!quoteId) {
      return NextResponse.json(
        {
          error: "Quote ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      action !== "accepted" &&
      action !== "declined"
    ) {
      return NextResponse.json(
        {
          error: "Invalid quote response.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = createAdminClient();

    /*
     * Load the quote and its related enquiry.
     */
    const { data: quote, error: quoteError } =
      await supabase
        .from("quotes")
        .select(
          `
            id,
            reference,
            enquiry_id,
            amount,
            currency,
            valid_until,
            status
          `
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
          error: "Unable to load the quotation.",
        },
        {
          status: 500,
        }
      );
    }

    if (!quote) {
      return NextResponse.json(
        {
          error: "Quotation not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Only sent quotes can receive a response.
     */
    if (quote.status !== "sent") {
      return NextResponse.redirect(
        new URL(
          `/quote/${quote.id}?response=already_processed`,
          request.url
        )
      );
    }

    /*
     * Check whether the quotation has expired.
     */
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
        .eq("id", quote.id)
        .eq("status", "sent");

      return NextResponse.redirect(
        new URL(
          `/quote/${quote.id}?response=expired`,
          request.url
        )
      );
    }

    /*
     * DECLINED
     */
    if (action === "declined") {
      const { error: quoteUpdateError } =
        await supabase
          .from("quotes")
          .update({
            status: "declined",
          })
          .eq("id", quote.id)
          .eq("status", "sent");

      if (quoteUpdateError) {
        console.error(
          "Quote decline update failed:",
          quoteUpdateError
        );

        return NextResponse.json(
          {
            error:
              "Unable to decline the quotation.",
          },
          {
            status: 500,
          }
        );
      }

      /*
       * Update the enquiry status.
       */
      if (quote.enquiry_id) {
        const { error: enquiryError } =
          await supabase
            .from("enquiries")
            .update({
              status: "rejected",
            })
            .eq("id", quote.enquiry_id);

        if (enquiryError) {
          console.error(
            "Enquiry decline update failed:",
            enquiryError
          );
        }
      }

      return NextResponse.redirect(
        new URL(
          `/quote/${quote.id}?response=declined`,
          request.url
        )
      );
    }

    /*
     * ACCEPTED
     *
     * First load the enquiry/customer so the new
     * order can be linked to the correct customer.
     */
    const { data: enquiry, error: enquiryError } =
      await supabase
        .from("enquiries")
        .select(
          `
            id,
            reference,
            customer_id
          `
        )
        .eq("id", quote.enquiry_id)
        .maybeSingle();

    if (enquiryError) {
      console.error(
        "Enquiry lookup failed:",
        enquiryError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load the enquiry connected to this quote.",
        },
        {
          status: 500,
        }
      );
    }

    if (!enquiry) {
      return NextResponse.json(
        {
          error:
            "The enquiry connected to this quotation could not be found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Check whether an order already exists for this quote.
     */
    const { data: existingOrder, error: orderLookupError } =
      await supabase
        .from("orders")
        .select(
          `
            id,
            reference,
            status
          `
        )
        .eq("quote_id", quote.id)
        .maybeSingle();

    if (orderLookupError) {
      console.error(
        "Existing order lookup failed:",
        orderLookupError
      );

      return NextResponse.json(
        {
          error:
            "Unable to check the order connected to this quote.",
        },
        {
          status: 500,
        }
      );
    }

    let orderReference: string;

    /*
     * If an order already exists, reuse it.
     */
    if (existingOrder) {
      orderReference = existingOrder.reference;
    } else {
      /*
       * Generate a unique ACE order reference.
       */
      orderReference = `ACE-ORD-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      const { data: newOrder, error: orderError } =
        await supabase
          .from("orders")
          .insert({
            reference: orderReference,
            customer_id: enquiry.customer_id,
            enquiry_id: enquiry.id,
            quote_id: quote.id,
            total_amount: quote.amount,
            currency: quote.currency || "NGN",
            status: "pending",
          })
          .select(
            `
              id,
              reference,
              status
            `
          )
          .single();

      if (orderError) {
        console.error(
          "Order creation failed:",
          orderError
        );

        return NextResponse.json(
          {
            error:
              "Unable to create the order for this quotation.",
          },
          {
            status: 500,
          }
        );
      }

      orderReference = newOrder.reference;
    }

    /*
     * Mark the quote as accepted.
     */
    const { error: quoteAcceptedError } =
      await supabase
        .from("quotes")
        .update({
          status: "accepted",
        })
        .eq("id", quote.id)
        .eq("status", "sent");

    if (quoteAcceptedError) {
      console.error(
        "Quote acceptance update failed:",
        quoteAcceptedError
      );

      return NextResponse.json(
        {
          error:
            "Unable to mark the quotation as accepted.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Update the enquiry.
     */
    const { error: enquiryUpdateError } =
      await supabase
        .from("enquiries")
        .update({
          status: "accepted",
        })
        .eq("id", enquiry.id);

    if (enquiryUpdateError) {
      console.error(
        "Enquiry acceptance update failed:",
        enquiryUpdateError
      );
    }

    /*
     * Send the customer directly to the payment/order page.
     */
    return NextResponse.redirect(
      new URL(
        `/order/${encodeURIComponent(
          orderReference
        )}`,
        request.url
      )
    );
  } catch (error) {
    console.error(
      "Unexpected quote response error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing the quotation.",
      },
      {
        status: 500,
      }
    );
  }
}