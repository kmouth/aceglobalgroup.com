"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PaymentData = {
  reference: string;
  status: string;
  amount: number;
  currency: string;
  paidAt: string | null;
  channel: string | null;
  customer?: {
    email?: string;
  };
};

export default function PaymentCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function verifyPayment() {
      try {
        const params = new URLSearchParams(window.location.search);
        const reference = params.get("reference");

        if (!reference) {
          setError("No payment reference was provided.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/paystack/verify?reference=${encodeURIComponent(reference)}`
        );

        const data = await response.json();

        if (!response.ok || !data.status) {
          throw new Error(
            data.message || "Unable to verify this payment."
          );
        }

        setPayment(data.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to verify payment."
        );
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8f4] px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-700" />

          <h1 className="text-2xl font-bold text-gray-900">
            Verifying your payment
          </h1>

          <p className="mt-2 text-gray-600">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </main>
    );
  }

  if (error || !payment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8f4] px-6">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
            !
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Payment Verification Failed
          </h1>

          <p className="mt-4 text-gray-600">
            {error || "We could not verify your payment."}
          </p>

          <Link
            href="/payment"
            className="mt-8 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Return to Payment
          </Link>
        </div>
      </main>
    );
  }

  const successful = payment.status === "success";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f4] px-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <div
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
            successful
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {successful ? "✓" : "!"}
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          {successful ? "Payment Successful" : "Payment Not Completed"}
        </h1>

        <p className="mt-4 text-gray-600">
          {successful
            ? "Your payment has been successfully verified by ACE Global Group."
            : `Your transaction status is "${payment.status}".`}
        </p>

        <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left">
          <div className="flex justify-between border-b border-gray-200 py-3">
            <span className="text-gray-500">Amount</span>

            <span className="font-semibold text-gray-900">
              {payment.currency}{" "}
              {(payment.amount / 100).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-200 py-3">
            <span className="text-gray-500">Reference</span>

            <span className="max-w-[220px] break-all text-right text-sm font-medium text-gray-900">
              {payment.reference}
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-gray-500">Status</span>

            <span
              className={`font-semibold ${
                successful
                  ? "text-green-700"
                  : "text-yellow-700"
              }`}
            >
              {payment.status}
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          Return to ACE Global Group
        </Link>
      </div>
    </main>
  );
}