import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { company } from "@/lib/company";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero */}

        <section className="relative overflow-hidden bg-slate-950 pt-40 pb-28 text-white">

          <div className="absolute inset-0 bg-[url('/images/contact-hero.jpg')] bg-cover bg-center opacity-25" />

          <div className="relative mx-auto max-w-7xl px-6 text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">
              Contact ACE Global Group
            </p>

            <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">
              Let's Build
              <br />
              Something Great Together.
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-300">
              Whether you're looking for agricultural products,
              logistics support, investment opportunities or strategic
              partnerships, our team is ready to help.
            </p>

          </div>

        </section>

        {/* Contact Information */}

        <section className="bg-white py-24">

          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">

              <Mail className="mb-6 text-emerald-700" size={34} />

              <h3 className="text-2xl font-bold text-slate-900">
                Email
              </h3>

              <p className="mt-4 text-slate-600">
                {company.email}
              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">

              <Phone className="mb-6 text-emerald-700" size={34} />

              <h3 className="text-2xl font-bold text-slate-900">
                Phone
              </h3>

              <p className="mt-4 text-slate-600">
                {company.displayPhone}
              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">

              <MapPin className="mb-6 text-emerald-700" size={34} />

              <h3 className="text-2xl font-bold text-slate-900">
                Address
              </h3>

              <p className="mt-4 text-slate-600">
                {company.address}
              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">

              <Clock className="mb-6 text-emerald-700" size={34} />

              <h3 className="text-2xl font-bold text-slate-900">
                Business Hours
              </h3>

              <p className="mt-4 text-slate-600">
                Monday – Friday
                <br />
                8:00 AM – 5:00 PM
              </p>

            </div>

          </div>

        </section>

        {/* Business Enquiry */}

        <section className="bg-emerald-50 py-24">

          <div className="mx-auto max-w-4xl px-6 text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
              Business Enquiries
            </p>

            <h2 className="mt-6 text-4xl font-black text-slate-900">
              Tell Us About Your Project
            </h2>

            <p className="mt-8 text-lg leading-9 text-slate-600">
              Complete our secure Business Enquiry Form and our team
              will respond as quickly as possible with the right
              solution for your needs.
            </p>

            <Link
              href={company.enquiryForm}
              target="_blank"
              className="mt-12 inline-flex items-center rounded-xl bg-emerald-700 px-10 py-5 text-lg font-semibold text-white transition hover:bg-emerald-800"
            >
              Complete Business Enquiry Form

              <ArrowRight className="ml-3" />

            </Link>

          </div>

        </section>

        {/* Why Contact ACE */}

        <section className="bg-white py-24">

          <div className="mx-auto max-w-7xl px-6">

            <div className="mx-auto mb-16 max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Why Work With Us
              </p>

              <h2 className="mt-4 text-4xl font-black text-slate-900">
                A Reliable Partner For Sustainable Growth
              </h2>

            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

              {[
                "Fast Response",
                "Professional Support",
                "Global Trade Expertise",
                "Long-Term Partnerships",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-3xl border border-slate-200 p-8 transition duration-300 hover:-translate-y-2 hover:border-emerald-600 hover:shadow-xl"
                >

                  <h3 className="text-xl font-bold text-slate-900">
                    {item}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    We are committed to delivering dependable service,
                    transparent communication and sustainable business
                    solutions.
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Final CTA */}

        <section className="bg-slate-900 py-24 text-white">

          <div className="mx-auto max-w-4xl px-6 text-center">

            <h2 className="text-5xl font-black">
              Let's Grow Together.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-300">
              From agriculture and logistics to international trade and
              strategic partnerships, ACE Global Group is ready to help
              your business succeed.
            </p>

            <Link
              href={company.enquiryForm}
              target="_blank"
              className="mt-12 inline-flex items-center rounded-xl bg-yellow-500 px-10 py-5 text-lg font-bold text-slate-900 transition hover:bg-yellow-400"
            >
              Start Your Enquiry

              <ArrowRight className="ml-3" />

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}