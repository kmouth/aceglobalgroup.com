"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-emerald-900 py-24 text-white">

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <div className="mx-auto inline-flex rounded-full bg-white/10 p-5 backdrop-blur">

            <PackageCheck className="h-10 w-10 text-yellow-400" />

          </div>

          <h2 className="mt-8 text-4xl font-black md:text-5xl">

            Ready to Source Premium Products?

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-emerald-100">

            Whether you're a distributor, wholesaler, retailer or
            international buyer, ACE Global Group delivers reliable,
            high-quality agricultural and processed products backed by
            sustainable sourcing and dependable logistics.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">

            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-yellow-400"
            >
              Request Product Catalogue

              <ArrowRight className="ml-3 h-5 w-5" />

            </Link>

            <Link
              href="/services"
              className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-emerald-900"
            >
              Explore Our Services
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}