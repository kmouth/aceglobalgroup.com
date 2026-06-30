"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 text-white min-h-[80vh]">

      {/* Background */}
      <div className="absolute inset-0">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/products-hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/70" />

      </div>

      <div className="relative mx-auto flex max-w-7xl items-center px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >

          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">

            <Package className="mr-2 h-4 w-4" />

            Premium Products

          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl xl:text-7xl">

            Quality Products
            <br />
            From Africa
            <br />
            To The World.

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">

            ACE Global Group supplies premium agricultural commodities,
            aquaculture products, processed foods and export-ready
            products sourced responsibly and delivered to international
            standards.

          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold transition hover:bg-emerald-700"
            >
              Request Catalogue

              <ArrowRight className="ml-3 h-5 w-5" />

            </Link>

            <Link
              href="/services"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition hover:bg-white hover:text-slate-900"
            >
              <Globe className="mr-2 h-5 w-5" />

              Export Services

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}