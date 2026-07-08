"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Download,
  FileText,
  ShieldCheck,
  Landmark,
  ArrowRight,
} from "lucide-react";

const highlights = [
  {
    icon: FileText,
    title: "Corporate Reports",
    description:
      "Access official reports, strategic plans and corporate publications.",
  },
  {
    icon: ShieldCheck,
    title: "Governance",
    description:
      "Transparency, accountability and responsible corporate leadership.",
  },
  {
    icon: Landmark,
    title: "Investor Resources",
    description:
      "Essential documents for investors, banks and development partners.",
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
            backgroundImage: "url('/images/publications-hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-8 lg:px-16">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-black/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] backdrop-blur">

              <BookOpen className="mr-2 h-4 w-4" />

              Publications Centre

            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl xl:text-7xl">

              Corporate
              <br />

              Publications

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">

              Explore ACE Global Group's official publications,
              investment reports, strategic plans, sustainability
              initiatives and corporate governance documents.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                href="/investors"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold transition hover:bg-emerald-700"
              >

                <ArrowRight className="mr-3 h-5 w-5" />

                Investor Centre

              </Link>

              <Link
                href="#library"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold backdrop-blur transition hover:bg-white hover:text-slate-900"
              >

                <Download className="mr-3 h-5 w-5" />

                Browse Publications

              </Link>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: .8,
              delay: .2,
            }}
          >

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">

                Official Resources

              </span>

              <div className="mt-10 space-y-8">

                {highlights.map((item) => {

                  const Icon = item.icon;

                  return (

                    <div
                      key={item.title}
                      className="flex gap-5"
                    >

                      <div className="rounded-2xl bg-emerald-600/20 p-4">

                        <Icon className="h-7 w-7 text-emerald-300" />

                      </div>

                      <div>

                        <h3 className="text-xl font-bold">

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

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}