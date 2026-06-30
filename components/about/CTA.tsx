"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-28 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">
            Let's Build Together
          </span>

          <h2 className="mt-6 text-4xl font-black md:text-6xl">
            Join Us in Building the Future.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Whether you're looking to partner with us, explore investment
            opportunities or learn more about our businesses, we'd love to hear
            from you.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold transition-all duration-300 hover:bg-emerald-500"
            >
              Partner With Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/services"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition-all duration-300 hover:bg-white/10"
            >
              Explore Our Businesses
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}