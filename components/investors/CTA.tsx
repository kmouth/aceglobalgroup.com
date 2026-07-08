"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-32 text-white">

      <div className="mx-auto max-w-6xl px-6">

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.7}}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl"
        >

          <h2 className="text-5xl font-black">

            Let's Build Africa Together

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-300">

            Partner with ACE Global Group to deliver sustainable growth,
            transformational infrastructure and long-term economic value
            across Africa.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold hover:bg-emerald-700"
            >

              Schedule Executive Meeting

              <ArrowRight className="ml-3 h-5 w-5"/>

            </Link>

            <Link
              href="/publications"
              className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 font-semibold hover:bg-white hover:text-slate-900"
            >

              <Download className="mr-3 h-5 w-5"/>

              Download Prospectus

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}