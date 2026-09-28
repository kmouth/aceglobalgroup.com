import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function generateReference(prefix: string) {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);

  return `${prefix}-${year}-${random}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const quoteReference = (
      searchParams.get("quote") ||
      searchParams.get("reference") ||
      ""
    ).trim();

    const action = (
      searchParams.get("action") ||
      ""
    ).trim().toLowerCase();

    if (!quoteReference || !action) {
      return NextResponse.json(
        {
          error:
            "Quote reference and action are required.",
        },
        { status: 400 }
      );
    }

    if (action !== "accept" && action !== "decline") {
      return NextResponse.json(
        {
          error:
            "Invalid action. Use accept or decline.",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

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
        .eq("reference", quoteReference)
        .maybeSingle();

    if (quoteError) {
      console.error(
        "Quote lookup error:",
        quoteError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load the quotation.",
        },
        { status: 500 }
      );
    }

    if (!quote) {
      return NextResponse.json(
        {
          error: "Quotation not found.",
        },
        { status: 404 }
      );
    }

    if (quote.status !== "sent") {
      return NextResponse.redirect(
        new URL(
          `/quote/${quote.reference}?response=already_processed`,
          request.url
        )
      );
    }

    if (
      quote.valid_until &&
      new Date(quote.valid_until).getTime() <
        Date.now()
    ) {
      await supabase
        .from("quotes")
        .update({
          status: "expired",
        })
        .eq("id", quote.id);

      await supabase
        .from("enquiries")
        .update({
          status: "closed",
        })
        .eq("id", quote.enquiry_id);

      return NextResponse.redirect(
        new URL(
          `/quote/${quote.reference}?response=expired`,
          request.url
        )
      );
    }

    if (action === "decline") {
      const { error: quoteUpdateError } =
        await supabase
          .from("quotes")
          .update({
            status: "declined",
          })
          .eq("id", quote.id);

      if (quoteUpdateError) {
        console.error(
          "Quote decline update error:",
          quoteUpdateError
        );

        return NextResponse.json(
          {
            error:
              "Unable to record the quotation response.",
          },
          { status: 500 }
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
          "Enquiry decline update error:",
          enquiryUpdateError
        );
      }

      return NextResponse.redirect(
        new URL(
          `/quote/${quote.reference}?response=declined`,
          request.url
        )
      );
    }

    /*
     * ACCEPT QUOTE
     *
     * First check whether an order already exists for
     * this quote. The quote_id column has a unique
     * partial index, so this also prevents duplicate
     * orders from being created.
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
        "Existing order lookup error:",
        orderLookupError
      );

      return NextResponse.json(
        {
          error:
            "Unable to check the existing order.",
        },
        { status: 500 }
      );
    }

    let orderReference = existingOrder?.reference;

    if (!existingOrder) {
      orderReference = generateReference("ACE-ORD");

      const { data: newOrder, error: orderError } =
        await supabase
          .from("orders")
          .insert({
            reference: orderReference,
            customer_id: null,
            enquiry_id: quote.enquiry_id,
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

      if (orderError || !newOrder) {
        console.error(
          "Order creation error:",
          orderError
        );

        return NextResponse.json(
          {
            error:
              "Unable to create the order.",
          },
          { status: 500 }
        );
      }

      orderReference = newOrder.reference;
    }

    /*
     * Get the customer through the enquiry so the
     * order has the correct customer_id.
     */
    const { data: enquiry, error: enquiryError } =
      await supabase
        .from("enquiries")
        .select(
          `
            id,
            customer_id
          `
        )
        .eq("id", quote.enquiry_id)
        .maybeSingle();

    if (enquiryError) {
      console.error(
        "Enquiry lookup error:",
        enquiryError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load the enquiry.",
        },
        { status: 500 }
      );
    }

    if (enquiry?.customer_id) {
      await supabase
        .from("orders")
        .update({
          customer_id: enquiry.customer_id,
        })
        .eq("reference", orderReference);
    }

    /*
     * Mark the quote as accepted and the enquiry as
     * accepted.
     */
    const { error: quoteUpdateError } =
      await supabase
        .from("quotes")
        .update({
          status: "accepted",
        })
        .eq("id", quote.id);

    if (quoteUpdateError) {
      console.error(
        "Quote acceptance update error:",
        quoteUpdateError
      );

      return NextResponse.json(
        {
          error:
            "Unable to record the quotation acceptance.",
        },
        { status: 500 }
      );
    }

    const { error: enquiryUpdateError } =
      await supabase
        .from("enquiries")
        .update({
          status: "accepted",
        })
        .eq("id", quote.enquiry_id);

    if (enquiryUpdateError) {
      console.error(
        "Enquiry acceptance update error:",
        enquiryUpdateError
      );
    }

    /*
     * IMPORTANT:
     *
     * Instead of returning the customer to the quote
     * page, send them directly to the order/payment
     * page after accepting the quotation.
     */
    return NextResponse.redirect(
      new URL(
        `/order/${orderReference}`,
        request.url
      )
    );
  } catch (error) {
    console.error(
      "Quote response error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process the quotation response.",
      },
      { status: 500 }
    );
  }
}