"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mb-20"
        >
            <SectionHeader
  eyebrow="Mission & Vision"
  title="Driven by Purpose. Inspired by Possibility."
  description="..."
/>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Our Purpose
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Driven by Vision. Guided by Purpose.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every investment, partnership and innovation is guided by our
            commitment to creating sustainable value for businesses,
            communities and future generations.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Eye size={30} />
            </div>

            <h3 className="mt-8 text-3xl font-bold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              To become one of the world's most respected diversified business
              groups, recognised for innovation, sustainable development,
              operational excellence and transformative impact across every
              sector in which we operate.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-10 text-white shadow-lg transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Target size={30} />
            </div>

            <h3 className="mt-8 text-3xl font-bold">
              Our Mission
            </h3>

            <p className="mt-6 text-lg leading-8 text-emerald-50">
              To build innovative businesses that empower people, strengthen
              economies and create long-term value through strategic
              investments, responsible leadership, technology and sustainable
              enterprise across Africa and beyond.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}