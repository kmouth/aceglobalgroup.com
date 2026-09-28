import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const reference =
      request.nextUrl.searchParams.get(
        "reference"
      );

    if (!reference) {
      return NextResponse.json(
        {
          status: false,
          message:
            "Transaction reference is required.",
        },
        { status: 400 }
      );
    }

    const secretKey =
      process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error(
        "PAYSTACK_SECRET_KEY is not configured."
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Payment service is not configured.",
        },
        { status: 500 }
      );
    }

    const supabase = createAdminClient();

    /*
     * Find the internal ACE payment first.
     *
     * This prevents an arbitrary Paystack transaction
     * from being used to confirm an ACE order.
     */
    const { data: payment, error: paymentError } =
      await supabase
        .from("payments")
        .select(
          `
            id,
            reference,
            order_id,
            customer_id,
            amount,
            currency,
            provider_status
          `
        )
        .eq("reference", reference)
        .maybeSingle();

    if (paymentError) {
      console.error(
        "Payment lookup failed:",
        paymentError
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Unable to find the payment record.",
        },
        { status: 500 }
      );
    }

    if (!payment) {
      return NextResponse.json(
        {
          status: false,
          message:
            "This payment reference is not recognized by ACE Global Group.",
        },
        { status: 404 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      console.error(
        "Paystack verification failed:",
        data
      );

      return NextResponse.json(
        {
          status: false,
          message:
            data.message ||
            "Unable to verify payment.",
        },
        {
          status: response.status || 500,
        }
      );
    }

    const transaction = data.data;

    /*
     * Verify the transaction amount and currency
     * against our own database before confirming
     * the order.
     */
    const expectedAmount =
      Math.round(Number(payment.amount) * 100);

    const receivedAmount =
      Number(transaction.amount);

    const expectedCurrency =
      String(payment.currency || "")
        .toUpperCase();

    const receivedCurrency =
      String(transaction.currency || "")
        .toUpperCase();

    if (
      receivedAmount !== expectedAmount ||
      receivedCurrency !== expectedCurrency
    ) {
      console.error(
        "Payment amount/currency mismatch:",
        {
          reference,
          expectedAmount,
          receivedAmount,
          expectedCurrency,
          receivedCurrency,
        }
      );

      await supabase
        .from("payments")
        .update({
          provider_status:
            "amount_mismatch",
          metadata: {
            paystack_reference:
              transaction.reference,
            paystack_amount:
              transaction.amount,
            paystack_currency:
              transaction.currency,
          },
        })
        .eq("id", payment.id);

      return NextResponse.json(
        {
          status: false,
          message:
            "The payment amount or currency does not match the ACE order.",
        },
        { status: 400 }
      );
    }

    /*
     * Save the verified Paystack result.
     */
    const { error: paymentUpdateError } =
      await supabase
        .from("payments")
        .update({
          provider_status:
            transaction.status,
          channel:
            transaction.channel || null,
          paid_at:
            transaction.paid_at || null,
          metadata: {
            paystack_reference:
              transaction.reference,
            paystack_status:
              transaction.status,
            paystack_amount:
              transaction.amount,
            paystack_currency:
              transaction.currency,
            gateway_response:
              transaction.gateway_response ||
              null,
            customer_code:
              transaction.customer?.customer_code ||
              null,
          },
        })
        .eq("id", payment.id);

    if (paymentUpdateError) {
      console.error(
        "Payment record update failed:",
        paymentUpdateError
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Payment was verified, but ACE could not update the payment record.",
        },
        { status: 500 }
      );
    }

    /*
     * Only a successful Paystack transaction can
     * confirm the ACE order.
     */
    if (transaction.status === "success") {
      const { error: orderUpdateError } =
        await supabase
          .from("orders")
          .update({
            status: "confirmed",
          })
          .eq("id", payment.order_id)
          .neq("status", "cancelled");

      if (orderUpdateError) {
        console.error(
          "Order confirmation failed:",
          orderUpdateError
        );

        return NextResponse.json(
          {
            status: false,
            message:
              "Payment succeeded, but the order could not be confirmed automatically.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      status: true,
      message:
        "Transaction verified successfully.",
      data: {
        reference:
          transaction.reference,
        status:
          transaction.status,
        amount:
          transaction.amount,
        currency:
          transaction.currency,
        paidAt:
          transaction.paid_at,
        channel:
          transaction.channel,
        customer:
          transaction.customer,
        metadata:
          transaction.metadata,
        orderId:
          payment.order_id,
      },
    });
  } catch (error) {
    console.error(
      "Paystack verification error:",
      error
    );

    return NextResponse.json(
      {
        status: false,
        message:
          "An unexpected error occurred while verifying payment.",
      },
      { status: 500 }
    );
  }
}