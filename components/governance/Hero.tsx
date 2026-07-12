"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Landmark,
  Globe2,
  Scale,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Corporate Governance",
    description:
      "Strong governance structures built on accountability, transparency and ethical leadership.",
  },
  {
    icon: Scale,
    title: "Risk & Compliance",
    description:
      "Robust internal controls that ensure responsible decision-making and sustainable operations.",
  },
  {
    icon: Globe2,
    title: "Global Standards",
    description:
      "Aligning our governance framework with internationally recognised corporate best practices.",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-44 pb-28 min-h-screen text-white">

      {/* Background */}
      <div className="absolute inset-0">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/investors-hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-emerald-600/20 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.35em] backdrop-blur">

              <Landmark className="mr-2 h-4 w-4" />

              Governance

            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl xl:text-7xl">

              Responsible
              <br />

              Leadership For
              <br />

              Sustainable Growth

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">

              Governance at ACE Global Group is founded on
              integrity, transparency and accountability.
              Our framework supports responsible leadership,
              sustainable investment and long-term value
              creation for shareholders, partners and communities.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                href="/publications"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold transition hover:bg-emerald-700"
              >

                Governance Reports

                <ArrowRight className="ml-3 h-5 w-5" />

              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur transition hover:bg-white hover:text-slate-900"
              >

                Contact Our Team

              </Link>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: .8,
              delay: .2,
            }}
          >

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

              <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">

                Governance Highlights

              </span>

              <h2 className="mt-5 text-3xl font-bold">

                Building Trust.
                <br />
                Creating Confidence.

              </h2>

              <div className="mt-10 space-y-8">

                {highlights.map((item) => {

                  const Icon = item.icon;

                  return (

                    <div
                      key={item.title}
                      className="flex items-start gap-5"
                    >

                      <div className="rounded-2xl bg-emerald-600/20 p-4">

                        <Icon className="h-7 w-7 text-emerald-300" />

                      </div>

                      <div>

                        <h3 className="text-xl font-semibold">

                          {item.title}

                        </h3>

                        <p className="mt-2 leading-7 text-slate-300">

                          {item.description}

                        </p>

                      </div>

                    </div>

                  );

                })}

              </div>

              <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">

                  Our Commitment

                </p>

                <p className="mt-4 leading-8 text-slate-200">

                  To maintain the highest standards of corporate
                  governance while delivering sustainable value
                  through ethical leadership and responsible business
                  practices.

                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}