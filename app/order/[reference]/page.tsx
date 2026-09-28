import Link from "next/link";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type OrderPageProps = {
  params: Promise<{
    reference: string;
  }>;
};

export default async function OrderPage({
  params,
}: OrderPageProps) {
  const { reference } = await params;

  const supabase = createAdminClient();

  const { data: order, error } =
    await supabase
      .from("orders")
      .select(
        `
          id,
          reference,
          total_amount,
          currency,
          status,
          created_at,
          customers (
            full_name,
            company_name,
            email
          ),
          quotes (
            reference
          ),
          enquiries (
            service,
            pickup_location,
            delivery_location,
            cargo_product,
            quantity
          )
        `
      )
      .eq("reference", reference)
      .maybeSingle();

  if (error) {
    console.error(
      "Order page lookup failed:",
      error
    );

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8f4] px-6">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">
            Unable to load order
          </h1>

          <p className="mt-4 text-gray-600">
            We could not load this order right now.
          </p>
        </div>
      </main>
    );
  }

  if (!order) {
    redirect("/");
  }

  const customer = Array.isArray(
    order.customers
  )
    ? order.customers[0]
    : order.customers;

  const quote = Array.isArray(
    order.quotes
  )
    ? order.quotes[0]
    : order.quotes;

  const enquiry = Array.isArray(
    order.enquiries
  )
    ? order.enquiries[0]
    : order.enquiries;

  const amount = Number(
    order.total_amount
  );

  const isPaid =
    order.status === "confirmed" ||
    order.status === "processing" ||
    order.status === "fulfilled" ||
    order.status === "completed";

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-green-800"
        >
          ACE GLOBAL GROUP
        </Link>

        <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="bg-green-800 px-8 py-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-100">
              ACE Global Group
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Order Payment
            </h1>

            <p className="mt-3 max-w-2xl text-green-50">
              Review your order and complete
              payment securely through Paystack.
            </p>
          </div>

          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Order Reference
                </p>

                <p className="mt-2 break-all font-semibold text-gray-900">
                  {order.reference}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Order Status
                </p>

                <p
                  className={`mt-2 font-semibold ${
                    isPaid
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900">
                Customer
              </h2>

              <div className="mt-4 rounded-2xl border border-gray-200 p-5">
                <p className="font-semibold text-gray-900">
                  {customer?.full_name ||
                    "Customer"}
                </p>

                {customer?.company_name && (
                  <p className="mt-1 text-gray-600">
                    {customer.company_name}
                  </p>
                )}

                <p className="mt-1 text-gray-600">
                  {customer?.email}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900">
                Order Details
              </h2>

              <div className="mt-4 space-y-3 rounded-2xl border border-gray-200 p-5">
                {quote?.reference && (
                  <div className="flex justify-between gap-6 border-b border-gray-100 py-3">
                    <span className="text-gray-500">
                      Quote
                    </span>

                    <span className="font-medium text-gray-900">
                      {quote.reference}
                    </span>
                  </div>
                )}

                {enquiry?.service && (
                  <div className="flex justify-between gap-6 border-b border-gray-100 py-3">
                    <span className="text-gray-500">
                      Service
                    </span>

                    <span className="text-right font-medium text-gray-900">
                      {enquiry.service}
                    </span>
                  </div>
                )}

                {enquiry?.pickup_location && (
                  <div className="flex justify-between gap-6 border-b border-gray-100 py-3">
                    <span className="text-gray-500">
                      Pickup
                    </span>

                    <span className="text-right font-medium text-gray-900">
                      {enquiry.pickup_location}
                    </span>
                  </div>
                )}

                {enquiry?.delivery_location && (
                  <div className="flex justify-between gap-6 border-b border-gray-100 py-3">
                    <span className="text-gray-500">
                      Delivery
                    </span>

                    <span className="text-right font-medium text-gray-900">
                      {enquiry.delivery_location}
                    </span>
                  </div>
                )}

                {enquiry?.cargo_product && (
                  <div className="flex justify-between gap-6 border-b border-gray-100 py-3">
                    <span className="text-gray-500">
                      Cargo / Product
                    </span>

                    <span className="text-right font-medium text-gray-900">
                      {enquiry.cargo_product}
                    </span>
                  </div>
                )}

                {enquiry?.quantity && (
                  <div className="flex justify-between gap-6 py-3">
                    <span className="text-gray-500">
                      Quantity
                    </span>

                    <span className="text-right font-medium text-gray-900">
                      {enquiry.quantity}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-green-50 p-6">
              <p className="text-sm font-medium text-green-800">
                Amount Due
              </p>

              <p className="mt-2 text-4xl font-bold text-green-900">
                {order.currency}{" "}
                {amount.toLocaleString(
                  "en-NG",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>

            {isPaid ? (
              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
                <h2 className="text-xl font-bold text-green-800">
                  Payment Confirmed
                </h2>

                <p className="mt-2 text-green-700">
                  This order has already received
                  payment and has been confirmed by
                  ACE Global Group.
                </p>
              </div>
            ) : (
              <div className="mt-8">
                <form
                  action="/api/orders/pay"
                  method="POST"
                >
                  <input
                    type="hidden"
                    name="orderReference"
                    value={order.reference}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-green-800 px-6 py-4 text-lg font-bold text-white transition hover:bg-green-900"
                  >
                    Pay ₦
                    {amount.toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    with Paystack
                  </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                  You will be securely redirected to
                  Paystack to complete your payment.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ACE Global
          Group. All rights reserved.
        </p>
      </div>
    </main>
  );
}