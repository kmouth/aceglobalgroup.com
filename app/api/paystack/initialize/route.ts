import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function generatePaymentReference() {
  const year = new Date().getFullYear();
  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `ACE-PAY-${year}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderReference = String(
      body.orderReference || ""
    ).trim();

    if (!orderReference) {
      return NextResponse.json(
        {
          status: false,
          message: "Order reference is required.",
        },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error(
        "PAYSTACK_SECRET_KEY is not configured."
      );

      return NextResponse.json(
        {
          status: false,
          message: "Payment service is not configured.",
        },
        { status: 500 }
      );
    }

    const supabase = createAdminClient();

    /*
     * Get the order and customer directly from
     * Supabase. We do NOT trust amount or email
     * supplied by the browser.
     */
    const { data: order, error: orderError } =
      await supabase
        .from("orders")
        .select(
          `
            id,
            reference,
            total_amount,
            currency,
            status,
            customer_id,
            customers (
              id,
              full_name,
              email
            )
          `
        )
        .eq("reference", orderReference)
        .maybeSingle();

    if (orderError) {
      console.error(
        "Order lookup failed:",
        orderError
      );

      return NextResponse.json(
        {
          status: false,
          message: "Unable to find the order.",
        },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          status: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    if (order.status === "confirmed") {
      return NextResponse.json(
        {
          status: false,
          message: "This order has already been paid.",
        },
        { status: 409 }
      );
    }

    if (
      order.status === "cancelled" ||
      order.status === "completed"
    ) {
      return NextResponse.json(
        {
          status: false,
          message:
            "This order is no longer available for payment.",
        },
        { status: 409 }
      );
    }

    const customer = Array.isArray(
      order.customers
    )
      ? order.customers[0]
      : order.customers;

    if (!customer?.email) {
      return NextResponse.json(
        {
          status: false,
          message:
            "The customer does not have a valid email address.",
        },
        { status: 400 }
      );
    }

    const amount = Number(order.total_amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          status: false,
          message:
            "The order has an invalid payment amount.",
        },
        { status: 400 }
      );
    }

    const paymentReference =
      generatePaymentReference();

    /*
     * Create our internal payment record first.
     */
    const { error: paymentInsertError } =
      await supabase
        .from("payments")
        .insert({
          reference: paymentReference,
          order_id: order.id,
          customer_id: order.customer_id,
          amount,
          currency: order.currency,
          provider: "paystack",
          provider_status: "initialized",
          metadata: {
            order_reference: order.reference,
          },
        });

    if (paymentInsertError) {
      console.error(
        "Payment record creation failed:",
        paymentInsertError
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Unable to prepare the payment.",
        },
        { status: 500 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://aceglobalgroup.vercel.app";

    /*
     * Paystack expects the amount in the
     * currency subunit.
     *
     * ₦300,000 = 30,000,000 kobo.
     */
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customer.email,
          amount: Math.round(amount * 100),
          currency: order.currency,
          reference: paymentReference,
          metadata: {
            order_reference: order.reference,
            order_id: order.id,
            customer_id: order.customer_id,
          },
          callback_url: `${siteUrl}/payment/callback`,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      console.error(
        "Paystack initialization failed:",
        data
      );

      await supabase
        .from("payments")
        .update({
          provider_status: "initialization_failed",
          metadata: {
            order_reference: order.reference,
            error: data.message || "Paystack initialization failed.",
          },
        })
        .eq("reference", paymentReference);

      return NextResponse.json(
        {
          status: false,
          message:
            data.message ||
            "Unable to initialize payment.",
        },
        {
          status: response.status || 500,
        }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Payment initialized successfully.",
      data: {
        authorization_url:
          data.data.authorization_url,
        access_code: data.data.access_code,
        reference: paymentReference,
        orderReference: order.reference,
      },
    });
  } catch (error) {
    console.error(
      "Paystack initialization error:",
      error
    );

    return NextResponse.json(
      {
        status: false,
        message:
          "An unexpected error occurred while initializing payment.",
      },
      { status: 500 }
    );
  }
}