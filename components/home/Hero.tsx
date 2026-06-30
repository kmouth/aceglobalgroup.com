"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  Leaf,
  Handshake,
  TrendingUp,
} from "lucide-react";

const highlights = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Building businesses that create lasting value.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description: "Collaborating to unlock long-term opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Driving innovation across multiple industries.",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-44 pb-28 text-white min-h-screen">

      {/* Background */}
      <div className="absolute inset-0">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/homepage.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-10 lg:px-16">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left Side */}

          <motion.div
  className="pt-10 lg:pt-12"
  initial={{ opacity: 0, x: -40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
          

            <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-black/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">

              <Globe2 className="mr-2 h-4 w-4" />

            </span>

            BUILDING AFRICA'S FUTURE

            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-6xl xl:text-7xl">

              Creating Sustainable
              <br />
              Businesses That
              <br />
              Shape Tomorrow.

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">

              ACE Global Group is a diversified enterprise committed to
              sustainable growth, innovation and strategic investments
              across agriculture, logistics, aquaculture, manufacturing
              and global partnerships.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                href="/services"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-emerald-700"
              >
                Explore Our Businesses

                <ArrowRight className="ml-3 h-5 w-5" />

              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900"
              >
                Become a Strategic Partner
              </Link>

            </div>

            <div className="mt-16">

              <p className="animate-bounce text-sm uppercase tracking-[0.35em] text-emerald-300">

                ↓ Scroll to Discover

              </p>

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">

                ACE At A Glance

              </span>

              <h2 className="mt-5 text-3xl font-bold">

                Building Businesses.
                <br />
                Creating Opportunities.

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

              </div>              <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">

                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">

                  Our Commitment

                </p>

                <p className="mt-4 leading-8 text-slate-200">

                  To become a globally respected enterprise recognised
                  for innovation, sustainability and responsible
                  leadership.

                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}