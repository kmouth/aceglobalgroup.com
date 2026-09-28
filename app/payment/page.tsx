"use client";

import { FormEvent, useState } from "react";

export default function PaymentPage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const numericAmount = Number(amount);

      if (!email || !numericAmount || numericAmount <= 0) {
        setError("Please enter a valid email and payment amount.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: numericAmount,
          metadata: {
            purpose: purpose || "ACE Global Group payment",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(
          data.message || "Unable to initialize payment."
        );
      }

      window.location.href = data.data.authorization_url;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-6 py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            ACE Global Group
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Make a Payment
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-gray-600">
            Make a secure payment to ACE Global Group through Paystack.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5">
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Amount (NGN)
              </label>

              <input
                id="amount"
                type="number"
                min="100"
                step="1"
                required
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="1000"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="purpose"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Payment purpose
              </label>

              <input
                id="purpose"
                type="text"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                placeholder="Product, service, logistics, etc."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connecting to Paystack..." : "Continue to Payment"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            Your payment will be securely processed by Paystack.
            ACE Global Group does not store your card details.
          </p>
        </div>
      </div>
    </main>
  );
}