"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";

import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32 text-white">
      {/* Background Accent */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md lg:p-16"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600">
            <Handshake size={36} />
          </div>

          <h2 className="mt-8 text-4xl font-black md:text-5xl">
            Let's Build Africa's Future Together
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-300">
            Whether you're looking to invest, partner, or explore new
            opportunities, ACE Global Group is ready to build meaningful
            relationships that create sustainable value for businesses,
            communities and future generations.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-emerald-700"
            >
              Partner With ACE

              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-slate-900"
            >
              Learn More About Us
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}