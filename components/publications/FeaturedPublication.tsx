"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileText,
  Calendar,
  BadgeCheck,
} from "lucide-react";

export default function FeaturedPublication() {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-16 lg:grid-cols-2"
        >

          {/* Left */}

          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white shadow-2xl">

            <div className="inline-flex items-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em]">

              Featured Publication

            </div>

            <h2 className="mt-8 text-4xl font-black">

              ACE Global Group
              <br />

              Company Profile
              <br />

              2026 Edition

            </h2>

            <p className="mt-8 leading-8 text-slate-300">

              The official corporate profile presenting ACE Global
              Group's vision, operations, leadership, business
              sectors, strategic roadmap and long-term investment
              opportunities.

            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">

              <div>

                <Calendar className="mb-3 text-emerald-400" />

                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">

                  Published

                </p>

                <p className="mt-2 font-semibold">

                  July 2026

                </p>

              </div>

              <div>

                <BadgeCheck className="mb-3 text-emerald-400" />

                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">

                  Version

                </p>

                <p className="mt-2 font-semibold">

                  1.0 Official

                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">

              Flagship Publication

            </span>

            <h3 className="mt-5 text-5xl font-black text-slate-900">

              Everything Investors
              Need To Know.

            </h3>

            <p className="mt-8 text-lg leading-9 text-slate-600">

              This publication introduces ACE Global Group's corporate
              structure, investment strategy, governance framework,
              sustainability commitments and long-term growth vision.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "Corporate Overview",
                "Business Sectors",
                "Investment Strategy",
                "Leadership Structure",
                "Corporate Governance",
                "Strategic Roadmap",
                "ESG Commitments",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <FileText className="text-emerald-600" />

                  <span className="text-lg text-slate-700">

                    {item}

                  </span>

                </div>

              ))}

            </div>

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                href="#library"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >

                <Download className="mr-3 h-5 w-5" />

                Download Publication

              </Link>

              <Link
                href="/investors"
                className="inline-flex items-center rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:border-emerald-600 hover:text-emerald-600"
              >

                Investor Centre

                <ArrowRight className="ml-3 h-5 w-5" />

              </Link>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}