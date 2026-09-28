import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const allowedActions = [
  "accepted",
  "declined",
] as const;

type QuoteResponse =
  (typeof allowedActions)[number];

function generateOrderReference() {
  const year = new Date().getFullYear();
  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `ACE-ORD-${year}-${random}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const quoteId = String(
      formData.get("quoteId") || ""
    ).trim();

    const action = String(
      formData.get("action") || ""
    ).trim() as QuoteResponse;

    if (
      !quoteId ||
      !allowedActions.includes(action)
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
     * Load the quote and the related enquiry/customer.
     */
    const { data: quote, error: quoteError } =
      await supabase
        .from("quotes")
        .select(
          `
            id,
            reference,
            amount,
            currency,
            status,
            valid_until,
            enquiry_id,
            enquiries (
              id,
              customer_id
            )
          `
        )
        .eq("id", quoteId)
        .maybeSingle();

    if (quoteError) {
      console.error(
        "Quote response lookup failed:",
        quoteError
      );

      return NextResponse.json(
        {
          error: "Unable to find the quotation.",
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
     * The customer can only respond to a quote
     * that has been officially sent.
     */
    if (quote.status !== "sent") {
      return NextResponse.redirect(
        new URL(
          `/quote/${encodeURIComponent(
            quote.id
          )}`,
          request.url
        )
      );
    }

    /*
     * Prevent responses to expired quotations.
     */
    if (
      quote.valid_until &&
      new Date(
        `${quote.valid_until}T23:59:59Z`
      ) < new Date()
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
          `/quote/${encodeURIComponent(
            quote.id
          )}`,
          request.url
        )
      );
    }

    /*
     * DECLINED
     *
     * No order is created when a customer declines.
     */
    if (action === "declined") {
      const { error: updateQuoteError } =
        await supabase
          .from("quotes")
          .update({
            status: "declined",
          })
          .eq("id", quote.id)
          .eq("status", "sent");

      if (updateQuoteError) {
        console.error(
          "Quote decline update failed:",
          updateQuoteError
        );

        return NextResponse.json(
          {
            error:
              "Unable to record the quotation response.",
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
            status: "rejected",
          })
          .eq("id", quote.enquiry_id);

      if (enquiryUpdateError) {
        console.error(
          "Enquiry decline update failed:",
          enquiryUpdateError
        );
      }

      return NextResponse.redirect(
        new URL(
          `/quote/${encodeURIComponent(
            quote.id
          )}?response=declined`,
          request.url
        )
      );
    }

    /*
     * ACCEPTED
     *
     * First check whether an order already exists.
     * This makes the operation idempotent.
     */
    const { data: existingOrder, error: existingOrderError } =
      await supabase
        .from("orders")
        .select(
          "id, reference, status"
        )
        .eq("quote_id", quote.id)
        .maybeSingle();

    if (existingOrderError) {
      console.error(
        "Existing order lookup failed:",
        existingOrderError
      );

      return NextResponse.json(
        {
          error:
            "Unable to check the existing order.",
        },
        {
          status: 500,
        }
      );
    }

    let order = existingOrder;

    /*
     * Create an order if this accepted quote
     * does not already have one.
     */
    if (!order) {
      const enquiry = Array.isArray(
        quote.enquiries
      )
        ? quote.enquiries[0]
        : quote.enquiries;

      if (!enquiry?.customer_id) {
        return NextResponse.json(
          {
            error:
              "The quotation is missing its customer information.",
          },
          {
            status: 500,
          }
        );
      }

      let orderReference =
        generateOrderReference();

      let orderInsert = await supabase
        .from("orders")
        .insert({
          reference: orderReference,
          customer_id: enquiry.customer_id,
          enquiry_id: quote.enquiry_id,
          quote_id: quote.id,
          total_amount: quote.amount,
          currency: quote.currency,
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

      /*
       * If another request created the order at
       * exactly the same time, the unique quote_id
       * constraint protects us from creating a duplicate.
       *
       * Fetch the already-created order instead.
       */
      if (
        orderInsert.error?.code === "23505"
      ) {
        const { data: concurrentOrder } =
          await supabase
            .from("orders")
            .select(
              "id, reference, status"
            )
            .eq("quote_id", quote.id)
            .maybeSingle();

        if (!concurrentOrder) {
          console.error(
            "Order creation conflict but existing order could not be found:",
            orderInsert.error
          );

          return NextResponse.json(
            {
              error:
                "Unable to create or locate the order.",
            },
            {
              status: 500,
            }
          );
        }

        order = concurrentOrder;
      } else {
        if (orderInsert.error) {
          console.error(
            "Order creation failed:",
            orderInsert.error
          );

          return NextResponse.json(
            {
              error:
                "Unable to create the order.",
            },
            {
              status: 500,
            }
          );
        }

        order = orderInsert.data;
      }
    }

    /*
     * Mark the quote as accepted.
     */
    const { error: updateQuoteError } =
      await supabase
        .from("quotes")
        .update({
          status: "accepted",
        })
        .eq("id", quote.id)
        .eq("status", "sent");

    if (updateQuoteError) {
      console.error(
        "Quote acceptance update failed:",
        updateQuoteError
      );

      return NextResponse.json(
        {
          error:
            "The order was created, but the quotation could not be marked as accepted.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Mark the enquiry as accepted.
     */
    const { error: enquiryUpdateError } =
      await supabase
        .from("enquiries")
        .update({
          status: "accepted",
        })
        .eq("id", quote.enquiry_id);

    if (enquiryUpdateError) {
      console.error(
        "Enquiry acceptance update failed:",
        enquiryUpdateError
      );
    }

    /*
     * Send the customer back to the quotation
     * confirmation page with the order reference.
     */
    return NextResponse.redirect(
      new URL(
        `/quote/${encodeURIComponent(
          quote.id
        )}?response=accepted&order=${encodeURIComponent(
          order.reference
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
          "An unexpected error occurred while processing the quotation response.",
      },
      {
        status: 500,
      }
    );
  }
}