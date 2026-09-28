import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  ClipboardList,
  Clock3,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  LogOut,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authClient = await createClient();

  const { data } = await authClient.auth.getClaims();
  const claims = data?.claims ?? null;

  if (!claims) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const [
    totalResult,
    newResult,
    reviewingResult,
    quotedResult,
    convertedResult,
    recentResult,
  ] = await Promise.all([
    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),

    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "reviewing"),

    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "quoted"),

    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "converted"),

    supabase
      .from("enquiries")
      .select(
        `
          id,
          reference,
          service,
          status,
          created_at,
          customers (
            full_name,
            company_name,
            email
          )
        `
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(10),
  ]);

  if (totalResult.error || recentResult.error) {
    console.error(
      "Admin enquiry query failed:",
      totalResult.error || recentResult.error
    );
  }

  const stats = [
    {
      label: "Total Enquiries",
      value: totalResult.count ?? 0,
      icon: ClipboardList,
    },
    {
      label: "New",
      value: newResult.count ?? 0,
      icon: Clock3,
    },
    {
      label: "Reviewing",
      value: reviewingResult.count ?? 0,
      icon: FileCheck2,
    },
    {
      label: "Quoted",
      value: quotedResult.count ?? 0,
      icon: FileCheck2,
    },
    {
      label: "Converted",
      value: convertedResult.count ?? 0,
      icon: CheckCircle2,
    },
  ];

  const enquiries = recentResult.data ?? [];

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
              ACE Global Group
            </p>

            <h1 className="mt-1 text-2xl font-black text-slate-900">
              Admin Dashboard
            </h1>
          </div>

          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900">
            Business Overview
          </h2>

          <p className="mt-2 text-slate-600">
            Monitor customer enquiries and track your sales pipeline.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-emerald-100 p-3">
                    <Icon className="h-5 w-5 text-emerald-700" />
                  </div>

                  <span className="text-3xl font-black text-slate-900">
                    {stat.value}
                  </span>
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-600">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <section className="mt-10 rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Enquiries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest customer requests.
              </p>
            </div>

            <Link
              href="/admin/enquiries"
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {enquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="font-semibold text-slate-700">
                No enquiries yet.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                New customer enquiries will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {enquiries.map((enquiry) => {
                const customer = Array.isArray(enquiry.customers)
                  ? enquiry.customers[0]
                  : enquiry.customers;

                return (
                  <div
                    key={enquiry.id}
                    className="flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-bold text-slate-900">
                          {enquiry.reference}
                        </span>

                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                          {enquiry.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {customer?.full_name || "Unknown customer"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {enquiry.service}
                      </p>
                    </div>

                    <div className="text-sm text-slate-500 md:text-right">
                      {new Date(
                        enquiry.created_at
                      ).toLocaleDateString("en-NG", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}