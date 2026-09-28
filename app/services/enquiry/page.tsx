"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  "Agriculture",
  "Logistics",
  "Manufacturing",
  "International Trade",
];

type FormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  service: string;
  pickupLocation: string;
  deliveryLocation: string;
  cargoProduct: string;
  quantity: string;
  preferredDate: string;
  requirements: string;
};

export default function ServiceEnquiryPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    service: "",
    pickupLocation: "",
    deliveryLocation: "",
    cargoProduct: "",
    quantity: "",
    preferredDate: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedService = params.get("service");

    if (
      selectedService &&
      services.includes(selectedService)
    ) {
      setForm((current) => ({
        ...current,
        service: selectedService,
      }));
    }
  }, []);

  function updateField(
    field: keyof FormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(
          data.message || "Unable to submit enquiry."
        );
      }

      setReference(data.data.reference);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    return (
      <main className="min-h-screen bg-[#f7f8f4] px-6 py-32">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-black/5 md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-700" />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
              ACE Global Group
            </p>

            <h1 className="mt-4 text-4xl font-black text-slate-900">
              Enquiry Received
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Thank you for contacting ACE Global Group. Our team will review
              your requirements and contact you regarding availability,
              pricing and next steps.
            </p>

            <div className="mt-10 rounded-2xl bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">
                Your Enquiry Reference
              </p>

              <p className="mt-2 text-2xl font-bold tracking-wide text-emerald-700">
                {reference}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center rounded-xl border border-slate-300 px-7 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/services"
          className="inline-flex items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>

        <div className="mt-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            ACE Global Group
          </p>

          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Tell Us What You Need
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Provide your requirements below and our team will review your
            enquiry and determine the appropriate solution, pricing and next
            steps.
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Contact Information
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Tell us who we will be working with.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name *
                </label>

                <input
                  id="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company Name
                </label>

                <input
                  id="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={(event) =>
                    updateField("companyName", event.target.value)
                  }
                  placeholder="Company Ltd."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address *
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone / WhatsApp *
                </label>

                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  placeholder="+234..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900">
                Service Requirements
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Give us enough information to understand what you need.
              </p>
            </div>

            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Service Required *
              </label>

              <select
                id="service"
                required
                value={form.service}
                onChange={(event) =>
                  updateField("service", event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Select a service</option>

                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="pickupLocation"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Pickup / Origin Location
                </label>

                <input
                  id="pickupLocation"
                  type="text"
                  value={form.pickupLocation}
                  onChange={(event) =>
                    updateField(
                      "pickupLocation",
                      event.target.value
                    )
                  }
                  placeholder="Port Harcourt, Nigeria"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="deliveryLocation"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Delivery / Destination
                </label>

                <input
                  id="deliveryLocation"
                  type="text"
                  value={form.deliveryLocation}
                  onChange={(event) =>
                    updateField(
                      "deliveryLocation",
                      event.target.value
                    )
                  }
                  placeholder="Lagos, Nigeria"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="cargoProduct"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product / Cargo
                </label>

                <input
                  id="cargoProduct"
                  type="text"
                  value={form.cargoProduct}
                  onChange={(event) =>
                    updateField(
                      "cargoProduct",
                      event.target.value
                    )
                  }
                  placeholder="Describe the product or cargo"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Quantity / Weight
                </label>

                <input
                  id="quantity"
                  type="text"
                  value={form.quantity}
                  onChange={(event) =>
                    updateField("quantity", event.target.value)
                  }
                  placeholder="e.g. 100kg, 20 pallets"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="preferredDate"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Preferred Date
                </label>

                <input
                  id="preferredDate"
                  type="date"
                  value={form.preferredDate}
                  onChange={(event) =>
                    updateField(
                      "preferredDate",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="requirements"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Additional Requirements
              </label>

              <textarea
                id="requirements"
                rows={6}
                value={form.requirements}
                onChange={(event) =>
                  updateField("requirements", event.target.value)
                }
                placeholder="Tell us anything else we should know about your request..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting Enquiry..." : "Submit Enquiry"}

              {!loading && (
                <ArrowRight className="ml-3 h-5 w-5" />
              )}
            </button>

            <p className="text-center text-xs leading-5 text-slate-500">
              By submitting this enquiry, you are providing ACE Global Group
              with the information required to review your request and respond
              to you.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}