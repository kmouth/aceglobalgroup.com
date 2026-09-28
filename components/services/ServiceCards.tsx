"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Truck,
  Factory,
  Globe2,
} from "lucide-react";

const services = [
  {
    title: "Agriculture",
    description:
      "Commercial farming, commodity sourcing and sustainable agricultural development.",
    icon: Leaf,
  },
  {
    title: "Logistics",
    description:
      "Reliable transportation, warehousing and supply chain management solutions.",
    icon: Truck,
  },
  {
    title: "Manufacturing",
    description:
      "Value-added processing and production that meets international standards.",
    icon: Factory,
  },
  {
    title: "International Trade",
    description:
      "Import, export and strategic partnerships connecting African markets to the world.",
    icon: Globe2,
  },
];

export default function ServiceCards() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Our Services
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            What We Do
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            ACE Global Group provides integrated business solutions across
            agriculture, logistics, manufacturing and international trade.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl"
              >
                <div className="flex items-start gap-5">
                  <div className="rounded-2xl bg-emerald-100 p-4 transition-colors duration-300 group-hover:bg-emerald-600">
                    <Icon className="h-8 w-8 text-emerald-700 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {service.title}
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <Link
                    href={`/services/enquiry?service=${encodeURIComponent(
                      service.title
                    )}`}
                    className="inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700"
                  >
                    Enquire About This Service
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center md:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Ready to Work With ACE?
          </p>

          <h3 className="mt-4 text-3xl font-bold text-slate-900">
            Tell us what you need.
          </h3>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Share your requirements with our team and we&apos;ll help determine
            the appropriate solution, scope and next steps.
          </p>

          <Link
            href="/services/enquiry"
            className="mt-7 inline-flex items-center rounded-xl bg-slate-900 px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
          >
            Start an Enquiry
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}