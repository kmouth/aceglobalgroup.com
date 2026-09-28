import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const secretKey =
      process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error(
        "PAYSTACK_SECRET_KEY is not configured."
      );

      return NextResponse.json(
        {
          status: false,
          message: "Webhook is not configured.",
        },
        { status: 500 }
      );
    }

    const signature =
      request.headers.get(
        "x-paystack-signature"
      );

    if (!signature) {
      console.error(
        "Paystack webhook signature is missing."
      );

      return NextResponse.json(
        {
          status: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const rawBody = await request.text();

    const expectedSignature =
      crypto
        .createHmac("sha512", secretKey)
        .update(rawBody)
        .digest("hex");

    const receivedBuffer =
      Buffer.from(signature, "utf8");

    const expectedBuffer =
      Buffer.from(expectedSignature, "utf8");

    if (
      receivedBuffer.length !==
      expectedBuffer.length ||
      !crypto.timingSafeEqual(
        receivedBuffer,
        expectedBuffer
      )
    ) {
      console.error(
        "Invalid Paystack webhook signature."
      );

      return NextResponse.json(
        {
          status: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    let event: {
      event?: string;
      data?: {
        reference?: string;
        status?: string;
        amount?: number;
        currency?: string;
        channel?: string;
        paid_at?: string | null;
        gateway_response?: string | null;
      };
    };

    try {
      event = JSON.parse(rawBody);
    } catch {
      console.error(
        "Paystack webhook contained invalid JSON."
      );

      return NextResponse.json(
        {
          status: false,
          message: "Invalid webhook payload.",
        },
        { status: 400 }
      );
    }

    if (event.event !== "charge.success") {
      return NextResponse.json({
        status: true,
        message: "Event received.",
      });
    }

    const transaction = event.data;

    if (!transaction?.reference) {
      console.error(
        "Paystack charge.success event has no reference."
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Transaction reference is missing.",
        },
        { status: 400 }
      );
    }

    if (transaction.status !== "success") {
      return NextResponse.json({
        status: true,
        message:
          "Charge event received but transaction is not successful.",
      });
    }

    const supabase = createAdminClient();

    const { data: payment, error: paymentLookupError } =
      await supabase
        .from("payments")
        .select(
          `
            id,
            reference,
            order_id,
            amount,
            currency,
            provider,
            provider_status
          `
        )
        .eq("reference", transaction.reference)
        .maybeSingle();

    if (paymentLookupError) {
      console.error(
        "Webhook payment lookup failed:",
        paymentLookupError
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Unable to process webhook.",
        },
        { status: 500 }
      );
    }

    if (!payment) {
      console.error(
        "Webhook payment reference not found:",
        transaction.reference
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Payment reference not recognized.",
        },
        { status: 404 }
      );
    }

    if (payment.provider !== "paystack") {
      console.error(
        "Webhook provider mismatch:",
        payment.provider
      );

      return NextResponse.json(
        {
          status: false,
          message: "Payment provider mismatch.",
        },
        { status: 400 }
      );
    }

    const expectedAmount =
      Math.round(
        Number(payment.amount) * 100
      );

    const receivedAmount =
      Number(transaction.amount);

    const expectedCurrency =
      String(payment.currency || "")
        .toUpperCase();

    const receivedCurrency =
      String(transaction.currency || "")
        .toUpperCase();

    if (
      expectedAmount !== receivedAmount ||
      expectedCurrency !== receivedCurrency
    ) {
      console.error(
        "Webhook payment mismatch:",
        {
          reference:
            transaction.reference,
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
            webhook_event:
              event.event,
            paystack_reference:
              transaction.reference,
            paystack_amount:
              transaction.amount,
            paystack_currency:
              transaction.currency,
            gateway_response:
              transaction.gateway_response ||
              null,
          },
        })
        .eq("id", payment.id);

      return NextResponse.json(
        {
          status: false,
          message:
            "Payment amount or currency mismatch.",
        },
        { status: 400 }
      );
    }

    const { error: paymentUpdateError } =
      await supabase
        .from("payments")
        .update({
          provider_status: "success",
          channel:
            transaction.channel || null,
          paid_at:
            transaction.paid_at || null,
          metadata: {
            webhook_event:
              event.event,
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
          },
        })
        .eq("id", payment.id);

    if (paymentUpdateError) {
      console.error(
        "Webhook payment update failed:",
        paymentUpdateError
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Unable to update payment.",
        },
        { status: 500 }
      );
    }

    const { error: orderUpdateError } =
      await supabase
        .from("orders")
        .update({
          status: "confirmed",
        })
        .eq("id", payment.order_id)
        .in("status", [
          "pending",
          "confirmed",
        ]);

    if (orderUpdateError) {
      console.error(
        "Webhook order confirmation failed:",
        orderUpdateError
      );

      return NextResponse.json(
        {
          status: false,
          message:
            "Payment recorded but order confirmation failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      message:
        "Paystack webhook processed successfully.",
    });
  } catch (error) {
    console.error(
      "Unexpected Paystack webhook error:",
      error
    );

    return NextResponse.json(
      {
        status: false,
        message:
          "An unexpected webhook error occurred.",
      },
      { status: 500 }
    );
  }
}