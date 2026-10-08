import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Search,
} from "lucide-react";

import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type SearchParams = {
  search?: string;
  status?: string;
};

const statuses = [
  "all",
  "new",
  "reviewing",
  "quoted",
  "accepted",
  "rejected",
  "converted",
  "closed",
];

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();

  const params = await searchParams;

  const search = params.search?.trim() || "";
  const status = params.status || "all";

  const supabase = createAdminClient();

  let query = supabase
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
        created_at,
        customers (
          full_name,
          company_name,
          email,
          phone
        )
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data: enquiries, error } = await query;

  if (error) {
    console.error("Admin enquiries query failed:", error);
  }

  const filteredEnquiries = (enquiries ?? []).filter((enquiry) => {
    if (!search) {
      return true;
    }

    const customer = Array.isArray(enquiry.customers)
      ? enquiry.customers[0]
      : enquiry.customers;

    const searchableText = [
      enquiry.reference,
      enquiry.service,
      enquiry.status,
      enquiry.cargo_product,
      enquiry.pickup_location,
      enquiry.delivery_location,
      customer?.full_name,
      customer?.company_name,
      customer?.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search.toLowerCase());
  });

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
              Enquiries
            </h1>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3">
              <ClipboardList className="h-6 w-6 text-emerald-700" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900">
                Customer Enquiries
              </h2>

              <p className="mt-1 text-slate-600">
                Review and manage enquiries submitted to ACE Global Group.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <form
            method="GET"
            className="grid gap-4 md:grid-cols-[1fr_220px_auto]"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                name="search"
                type="text"
                defaultValue={search}
                placeholder="Search customer, reference, service..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <select
              name="status"
              defaultValue={status}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === "all"
                    ? "All Statuses"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Enquiry Records
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredEnquiries.length}{" "}
                  {filteredEnquiries.length === 1
                    ? "enquiry"
                    : "enquiries"}{" "}
                  found
                </p>
              </div>
            </div>
          </div>

          {error ? (
            <div className="px-6 py-16 text-center">
              <p className="font-semibold text-red-700">
                Unable to load enquiries.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Please refresh the page and try again.
              </p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <ClipboardList className="mx-auto h-10 w-10 text-slate-300" />

              <p className="mt-4 font-semibold text-slate-700">
                No enquiries found.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredEnquiries.map((enquiry) => {
                const customer = Array.isArray(enquiry.customers)
                  ? enquiry.customers[0]
                  : enquiry.customers;

                return (
                  <Link
                    key={enquiry.id}
                    href={`/admin/enquiries/${encodeURIComponent(
                      enquiry.reference
                    )}`}
                    className="group block px-6 py-6 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-bold text-slate-900">
                            {enquiry.reference}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                              enquiry.status === "new"
                                ? "bg-blue-100 text-blue-700"
                                : enquiry.status === "reviewing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : enquiry.status === "quoted"
                                    ? "bg-purple-100 text-purple-700"
                                    : enquiry.status === "accepted" ||
                                        enquiry.status === "converted"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : enquiry.status === "rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {enquiry.status}
                          </span>
                        </div>

                        <div className="mt-3">
                          <p className="font-semibold text-slate-800">
                            {customer?.full_name || "Unknown Customer"}
                          </p>

                          {customer?.company_name && (
                            <p className="mt-1 text-sm text-slate-500">
                              {customer.company_name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-sm lg:items-end">
                        <span className="font-medium text-slate-700">
                          {enquiry.service}
                        </span>

                        <span className="text-slate-500">
                          {new Date(enquiry.created_at).toLocaleDateString(
                            "en-NG",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>

                        <span className="inline-flex items-center font-semibold text-emerald-700 transition group-hover:text-emerald-800">
                          View Enquiry
                          <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}