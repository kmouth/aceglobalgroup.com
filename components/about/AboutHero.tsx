"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-40 pb-32 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[32rem] w-[32rem] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <Globe2 className="mr-2 h-4 w-4" />
              About ACE Global Group
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Building Businesses.
              <br />
              Creating Opportunities.
              <br />
              Shaping the Future.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              ACE Global Group is a diversified enterprise committed to
              innovation, responsible growth and sustainable value creation.
              Through strategic investments, partnerships and industry
              leadership, we are building businesses that positively impact
              Africa and connect with global opportunities.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold transition-all duration-300 hover:bg-emerald-500"
              >
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 font-semibold transition-all duration-300 hover:bg-white/10"
              >
                Explore Our Businesses
              </Link>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Our Purpose
                  </h3>
                  <p className="mt-3 leading-8 text-slate-300">
                    To build sustainable businesses that create lasting economic,
                    environmental and social value.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-2xl font-bold text-white">
                    Our Vision
                  </h3>
                  <p className="mt-3 leading-8 text-slate-300">
                    To become a globally respected enterprise recognised for
                    innovation, integrity and transformational impact across
                    industries.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-2xl font-bold text-white">
                    Our Commitment
                  </h3>
                  <p className="mt-3 leading-8 text-slate-300">
                    We pursue excellence through collaboration, responsible
                    leadership and an unwavering commitment to creating
                    opportunities that benefit businesses, communities and future
                    generations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}