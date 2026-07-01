import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { company } from "@/lib/company";

export default function ContactForm() {
  return (
    <section
      id="contact-form"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-14 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Business Enquiries
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            Let's Start the Conversation
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            We appreciate your interest in ACE Global Group.
            Whether you're looking for premium agricultural products,
            logistics solutions, strategic partnerships, investment
            opportunities or general business enquiries, our team is
            ready to assist you.
          </p>

        </div>

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <div className="space-y-6 text-center">

            <h3 className="text-3xl font-bold text-slate-900">
              Complete Our Business Enquiry Form
            </h3>

            <p className="mx-auto max-w-2xl leading-8 text-slate-600">
              To ensure your enquiry reaches the right department and
              receives a prompt response, we kindly ask that all
              enquiries be submitted through our secure Business
              Enquiry Form.
            </p>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

              <p className="font-medium leading-8 text-slate-700">
                Our team reviews every submission and typically responds
                within <strong>1–2 business days.</strong>
              </p>

            </div>

            <Link
              href={company.enquiryForm}
              target="_blank"
              className="inline-flex items-center rounded-xl bg-emerald-700 px-10 py-5 text-lg font-semibold text-white transition duration-300 hover:bg-emerald-800"
            >
              Complete Business Enquiry Form

              <ArrowRight className="ml-3 h-5 w-5" />

            </Link>

            <p className="text-sm text-slate-500">
              Prefer to speak with us directly? You can also reach us
              via phone or email using the contact information above.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}