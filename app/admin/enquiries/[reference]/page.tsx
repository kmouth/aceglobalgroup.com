import Link from "next/link";

import { notFound, redirect } from "next/navigation";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  PlusCircle,
  Send,
  User,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const statuses = [
  "new",
  "reviewing",
  "quoted",
  "accepted",
  "rejected",
  "converted",
  "closed",
];

type EnquiryPageProps = {
  params: Promise<{
    reference: string;
  }>;
  searchParams: Promise<{
    quoteCreated?: string;
    quoteSent?: string;
    quoteError?: string;
    warning?: string;
  }>;
};

export default async function EnquiryDetailsPage({
  params,
  searchParams,
}: EnquiryPageProps) {
  const authClient = await createClient();

  const { data } = await authClient.auth.getClaims();
  const claims = data?.claims ?? null;

  if (!claims) {
    redirect("/login");
  }

  const { reference } = await params;
  const query = await searchParams;

  const supabase = createAdminClient();

  const { data: enquiry, error } = await supabase
    .from("enquiries")
    .select(
      `
        id,
        reference,
        service,
        status,
        pickup_location,
        delivery_location,
        cargo_product,
        quantity,
        preferred_date,
        additional_requirements,
        created_at,
        updated_at,
        customers (
          id,
          full_name,
          company_name,
          email,
          phone,
          created_at
        )
      `
    )
    .eq("reference", reference)
    .maybeSingle();

  if (error) {
    console.error(
      "Admin enquiry details query failed:",
      error
    );
  }

  if (!enquiry) {
    notFound();
  }

  const customer = Array.isArray(enquiry.customers)
    ? enquiry.customers[0]
    : enquiry.customers;

  const { data: quotes, error: quotesError } =
    await supabase
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
          updated_at
        `
      )
      .eq("enquiry_id", enquiry.id)
      .order("created_at", {
        ascending: false,
      });

  if (quotesError) {
    console.error(
      "Quotes query failed:",
      quotesError
    );
  }

  const formatCurrency = (
    amount: number | string,
    currency = "NGN"
  ) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(Number(amount));
  };

  const formatDate = (
    value: string | null
  ) => {
    if (!value) {
      return "Not provided";
    }

    return new Date(value).toLocaleDateString(
      "en-NG",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/admin"
              className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700"
            >
              ACE Global Group
            </Link>

            <h1 className="mt-1 text-2xl font-black text-slate-900">
              Enquiry Details
            </h1>
          </div>

          <Link
            href="/admin/enquiries"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Enquiries
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Enquiry
            </span>

            <span className="text-sm text-slate-400">
              /
            </span>

            <span className="font-bold text-slate-700">
              {enquiry.reference}
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
              {enquiry.status}
            </span>
          </div>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            {enquiry.service}
          </h2>

          <p className="mt-2 text-slate-600">
            Submitted{" "}
            {new Date(
              enquiry.created_at
            ).toLocaleDateString("en-NG", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {query.quoteCreated && (
          <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

              <div>
                <p className="font-bold text-emerald-800">
                  Quote created successfully
                </p>

                <p className="mt-1 text-sm text-emerald-700">
                  Quote reference:{" "}
                  <span className="font-bold">
                    {query.quoteCreated}
                  </span>
                </p>

                {query.warning === "status" && (
                  <p className="mt-2 text-sm text-amber-700">
                    The quote was created, but the
                    enquiry status could not be updated.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {query.quoteSent && (
          <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <Send className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

              <div>
                <p className="font-bold text-blue-800">
                  Quote sent successfully
                </p>

                <p className="mt-1 text-sm text-blue-700">
                  Quote reference:{" "}
                  <span className="font-bold">
                    {query.quoteSent}
                  </span>
                </p>

                <p className="mt-2 text-sm text-blue-700">
                  The customer can now open the quotation
                  using the customer quote link below.
                </p>
              </div>
            </div>
          </div>
        )}

        {query.quoteError === "expired" && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

              <div>
                <p className="font-bold text-amber-800">
                  Quote has expired
                </p>

                <p className="mt-1 text-sm text-amber-700">
                  This quotation was not sent because its
                  validity date has already passed.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-3">
                  <User className="h-5 w-5 text-emerald-700" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Customer Information
                  </h3>

                  <p className="text-sm text-slate-500">
                    Customer associated with this enquiry.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {customer?.full_name ||
                      "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Company
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-400" />

                    <p className="font-semibold text-slate-900">
                      {customer?.company_name ||
                        "Not provided"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />

                    <a
                      href={`mailto:${customer?.email || ""}`}
                      className="font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      {customer?.email ||
                        "Not provided"}
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone / WhatsApp
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />

                    <a
                      href={`tel:${customer?.phone || ""}`}
                      className="font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      {customer?.phone ||
                        "Not provided"}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-3">
                  <ClipboardList className="h-5 w-5 text-emerald-700" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Service Requirements
                  </h3>

                  <p className="text-sm text-slate-500">
                    Details submitted by the customer.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Service
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {enquiry.service}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Product / Cargo
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <Package className="h-4 w-4 text-slate-400" />

                    <p className="font-semibold text-slate-900">
                      {enquiry.cargo_product ||
                        "Not provided"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pickup / Origin
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />

                    <p className="font-semibold text-slate-900">
                      {enquiry.pickup_location ||
                        "Not provided"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Delivery / Destination
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />

                    <p className="font-semibold text-slate-900">
                      {enquiry.delivery_location ||
                        "Not provided"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Quantity / Weight
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {enquiry.quantity ||
                      "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Preferred Date
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-400" />

                    <p className="font-semibold text-slate-900">
                      {enquiry.preferred_date
                        ? formatDate(
                            enquiry.preferred_date
                          )
                        : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Additional Requirements
                </p>

                <div className="mt-3 rounded-2xl bg-slate-50 p-5">
                  <p className="whitespace-pre-wrap leading-7 text-slate-700">
                    {enquiry.additional_requirements ||
                      "No additional requirements were provided."}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3">
                    <FileText className="h-5 w-5 text-emerald-700" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Quotes
                    </h3>

                    <p className="text-sm text-slate-500">
                      Quotes created for this enquiry.
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {quotes?.length || 0}{" "}
                  {quotes?.length === 1
                    ? "quote"
                    : "quotes"}
                </span>
              </div>

              {quotes && quotes.length > 0 ? (
                <div className="mt-8 space-y-4">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Quote Reference
                          </p>

                          <p className="mt-1 font-bold text-slate-900">
                            {quote.reference}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
                            quote.status === "accepted"
                              ? "bg-emerald-100 text-emerald-700"
                              : quote.status === "declined"
                                ? "bg-red-100 text-red-700"
                                : quote.status === "expired"
                                  ? "bg-slate-200 text-slate-600"
                                  : quote.status === "sent"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {quote.status}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-5 md:grid-cols-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Amount
                          </p>

                          <p className="mt-1 text-lg font-black text-slate-900">
                            {formatCurrency(
                              quote.amount,
                              quote.currency
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Valid Until
                          </p>

                          <p className="mt-1 font-semibold text-slate-700">
                            {formatDate(
                              quote.valid_until
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Created
                          </p>

                          <p className="mt-1 font-semibold text-slate-700">
                            {formatDate(
                              quote.created_at
                            )}
                          </p>
                        </div>
                      </div>

                      {quote.notes && (
                        <div className="mt-5 border-t border-slate-100 pt-5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Notes
                          </p>

                          <p className="mt-2 whitespace-pre-wrap leading-6 text-slate-600">
                            {quote.notes}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 border-t border-slate-100 pt-5">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          {quote.status === "draft" && (
                            <form
                              action="/api/admin/enquiries/quote/send"
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
                                name="enquiryReference"
                                value={enquiry.reference}
                              />

                              <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Send Quote
                              </button>
                            </form>
                          )}

                          {(quote.status === "sent" ||
                            quote.status ===
                              "accepted" ||
                            quote.status ===
                              "declined") && (
                            <Link
                              href={`/quote/${quote.id}`}
                              target="_blank"
                              className="flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open Customer Quote
                            </Link>
                          )}

                          {quote.status === "sent" && (
                            <div className="flex flex-1 items-center justify-center rounded-xl bg-blue-50 px-5 py-3 text-center text-xs font-semibold text-blue-700">
                              Customer link is active
                            </div>
                          )}

                          {quote.status === "accepted" && (
                            <div className="flex flex-1 items-center justify-center rounded-xl bg-emerald-50 px-5 py-3 text-center text-xs font-semibold text-emerald-700">
                              Customer accepted this quote
                            </div>
                          )}

                          {quote.status === "declined" && (
                            <div className="flex flex-1 items-center justify-center rounded-xl bg-red-50 px-5 py-3 text-center text-xs font-semibold text-red-700">
                              Customer declined this quote
                            </div>
                          )}

                          {quote.status === "expired" && (
                            <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-center text-xs font-semibold text-slate-600">
                              This quote has expired
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-slate-300" />

                  <p className="mt-3 font-semibold text-slate-700">
                    No quote created yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Create a quote using the form on the right.
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-8">
            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h3 className="text-xl font-bold text-slate-900">
                Create Quote
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Prepare a commercial quote for this enquiry.
              </p>

              <form
                action="/api/admin/enquiries/quote"
                method="POST"
                className="mt-6 space-y-5"
              >
                <input
                  type="hidden"
                  name="enquiryReference"
                  value={enquiry.reference}
                />

                <div>
                  <label
                    htmlFor="amount"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Quote Amount (NGN)
                  </label>

                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    placeholder="e.g. 250000"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="validUntil"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Valid Until
                  </label>

                  <input
                    id="validUntil"
                    name="validUntil"
                    type="date"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Quote Notes / Terms
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    placeholder="Add delivery terms, payment terms, exclusions or other notes..."
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Draft Quote
                </button>
              </form>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h3 className="text-xl font-bold text-slate-900">
                Enquiry Status
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Move this enquiry through the ACE sales pipeline.
              </p>

              <div className="mt-6 space-y-3">
                {statuses.map((status) => {
                  const active =
                    enquiry.status === status;

                  return (
                    <form
                      key={status}
                      action="/api/admin/enquiries/status"
                      method="POST"
                    >
                      <input
                        type="hidden"
                        name="reference"
                        value={enquiry.reference}
                      />

                      <input
                        type="hidden"
                        name="status"
                        value={status}
                      />

                      <button
                        type="submit"
                        disabled={active}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                          active
                            ? "cursor-default border-emerald-200 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
                        }`}
                      >
                        {active ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                        )}

                        <span
                          className={`font-semibold capitalize ${
                            active
                              ? "text-emerald-700"
                              : "text-slate-600"
                          }`}
                        >
                          {status}
                        </span>

                        {!active && (
                          <span className="ml-auto text-xs font-medium text-slate-400">
                            Set
                          </span>
                        )}
                      </button>
                    </form>
                  );
                })}
              </div>

              <p className="mt-6 text-xs leading-5 text-slate-400">
                Creating a quote automatically moves the
                enquiry to the quoted stage.
              </p>
            </section>

            <section className="rounded-3xl bg-slate-900 p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Enquiry Reference
              </p>

              <p className="mt-4 break-all text-xl font-bold">
                {enquiry.reference}
              </p>

              <p className="mt-6 text-sm leading-6 text-slate-300">
                This reference uniquely identifies the
                customer enquiry within the ACE Global
                Group system.
              </p>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Last Updated
                </p>

                <p className="mt-2 text-sm font-medium text-slate-200">
                  {new Date(
                    enquiry.updated_at
                  ).toLocaleDateString("en-NG", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}