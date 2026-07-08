"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-6xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] bg-gradient-to-r from-emerald-700 to-emerald-600 p-14 text-center text-white shadow-2xl"
        >

          <h2 className="text-5xl font-black">
            Need More Information?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-emerald-100">
            Contact our Investor Relations team for additional corporate
            publications, partnership information or bespoke documentation
            related to investment opportunities and strategic collaboration.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/investors"
              className="inline-flex items-center rounded-xl bg-white px-8 py-4 font-semibold text-emerald-700 transition hover:bg-slate-100"
            >
              <Download className="mr-3 h-5 w-5" />
              Investor Centre
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-white/30 px-8 py-4 font-semibold transition hover:bg-white hover:text-emerald-700"
            >
              Contact Us
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}