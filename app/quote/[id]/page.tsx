import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    response?: string;
  }>;
};

function formatCurrency(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: string | null) {
  if (!date) {
    return "Not specified";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default async function CustomerQuotePage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { response } = await searchParams;

  const supabase = createAdminClient();

  const { data: quote, error } = await supabase
    .from("quotes")
    .select(
      `
        id,
        reference,
        amount,
        currency,
        valid_until,
        status,
        notes,
        created_at,
        enquiry:enquiries (
          reference,
          service,
          pickup_location,
          delivery_location,
          cargo_product,
          quantity,
          preferred_date,
          customer:customers (
            full_name,
            company_name
          )
        )
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "Customer quote lookup failed:",
      error
    );

    notFound();
  }

  if (!quote) {
    notFound();
  }

  const enquiry = Array.isArray(quote.enquiry)
    ? quote.enquiry[0]
    : quote.enquiry;

  const customer = enquiry
    ? Array.isArray(enquiry.customer)
      ? enquiry.customer[0]
      : enquiry.customer
    : null;

  const today = new Date();
  const expiryDate = quote.valid_until
    ? new Date(`${quote.valid_until}T23:59:59Z`)
    : null;

  const isExpired =
    expiryDate !== null &&
    expiryDate < today &&
    quote.status !== "accepted" &&
    quote.status !== "declined";

  const canRespond =
    quote.status === "sent" && !isExpired;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            ACE <span className="text-emerald-400">GLOBAL GROUP</span>
          </Link>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Quotation
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-300">
              {quote.reference}
            </p>
          </div>
        </div>

        {response === "accepted" && (
          <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <h2 className="text-xl font-semibold text-emerald-300">
              Quote accepted
            </h2>

            <p className="mt-2 text-sm leading-6 text-emerald-100/80">
              Thank you. ACE Global Group has received your
              acceptance. Our team will proceed with the next
              stage of your request.
            </p>
          </div>
        )}

        {response === "declined" && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
            <h2 className="text-xl font-semibold text-red-300">
              Quote declined
            </h2>

            <p className="mt-2 text-sm leading-6 text-red-100/80">
              Your response has been recorded. If your
              requirements change, you can contact ACE Global
              Group for further assistance.
            </p>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-8 sm:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                  ACE Global Group
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Quotation
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Please review the quotation details below.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-left md:text-right">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
                  Quote Amount
                </p>

                <p className="mt-1 text-2xl font-bold text-emerald-300">
                  {formatCurrency(
                    Number(quote.amount),
                    quote.currency
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">
                Customer
              </h2>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="font-medium text-white">
                  {customer?.full_name || "Customer"}
                </p>

                {customer?.company_name && (
                  <p className="mt-1 text-sm text-slate-400">
                    {customer.company_name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Quote Details
              </h2>

              <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Reference
                  </span>

                  <span className="font-medium text-slate-200">
                    {quote.reference}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Valid Until
                  </span>

                  <span className="font-medium text-slate-200">
                    {formatDate(quote.valid_until)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Status
                  </span>

                  <span className="font-medium capitalize text-emerald-300">
                    {isExpired ? "Expired" : quote.status}
                  </span>
                </div>
              </div>
            </div>

            {enquiry && (
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold">
                  Service Request
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Service
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {enquiry.service || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Pickup
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {enquiry.pickup_location ||
                        "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Delivery
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {enquiry.delivery_location ||
                        "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Cargo / Product
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {enquiry.cargo_product ||
                        "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Quantity
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {enquiry.quantity || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Preferred Date
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {formatDate(
                        enquiry.preferred_date
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {quote.notes && (
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold">
                  Additional Notes
                </h2>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {quote.notes}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-black/20 px-6 py-8 sm:px-10">
            {isExpired && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                <h2 className="font-semibold text-amber-300">
                  This quotation has expired
                </h2>

                <p className="mt-2 text-sm leading-6 text-amber-100/70">
                  Please contact ACE Global Group if you
                  require an updated quotation.
                </p>
              </div>
            )}

            {!isExpired &&
              quote.status === "draft" && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h2 className="font-semibold">
                    Quotation not yet available
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    This quotation has not yet been released
                    to the customer.
                  </p>
                </div>
              )}

            {!isExpired &&
              quote.status === "sent" &&
              canRespond && (
                <div>
                  <h2 className="text-xl font-semibold">
                    Please confirm your response
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    Review the quotation above and select
                    whether you would like ACE Global Group to
                    proceed.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <form
                      action="/api/quotes/respond"
                      method="POST"
                      className="flex-1"
                    >
                      <input
                        type="hidden"
                        name="quoteId"
                        value={quote.id}
                      />

                      <input
                        type="hidden"
                        name="action"
                        value="accepted"
                      />

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
                      >
                        Accept Quote
                      </button>
                    </form>

                    <form
                      action="/api/quotes/respond"
                      method="POST"
                      className="flex-1"
                    >
                      <input
                        type="hidden"
                        name="quoteId"
                        value={quote.id}
                      />

                      <input
                        type="hidden"
                        name="action"
                        value="declined"
                      />

                      <button
                        type="submit"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                      >
                        Decline Quote
                      </button>
                    </form>
                  </div>
                </div>
              )}

            {quote.status === "accepted" &&
              !response && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <h2 className="font-semibold text-emerald-300">
                    Quote accepted
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                    This quotation has already been accepted.
                  </p>
                </div>
              )}

            {quote.status === "declined" &&
              !response && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
                  <h2 className="font-semibold text-red-300">
                    Quote declined
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-red-100/70">
                    This quotation has already been declined.
                  </p>
                </div>
              )}
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} ACE Global Group.
          All rights reserved.
        </footer>
      </div>
    </main>
  );
}