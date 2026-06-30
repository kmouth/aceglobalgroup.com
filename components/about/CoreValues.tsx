"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Handshake,
  Leaf,
  Users,
  TrendingUp,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We conduct every business relationship with honesty, transparency and accountability.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We embrace new ideas, technologies and creative thinking to solve complex challenges.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description:
      "We believe lasting success is built through partnerships, teamwork and mutual trust.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Every decision we make considers long-term economic, environmental and social impact.",
  },
  {
    icon: Users,
    title: "People First",
    description:
      "Our people, customers and communities remain at the centre of everything we build.",
  },
  {
    icon: TrendingUp,
    title: "Excellence",
    description:
      "We pursue the highest standards of quality, innovation and operational performance.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mb-20"
        >
            <SectionHeader
  eyebrow="Core Values"
  title="Principles That Define Every Decision"
  description="..."
/>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Our Core Values
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Principles That Define Every Decision
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our values shape our culture, strengthen our partnerships and guide
            every investment, innovation and opportunity we pursue.
          </p>
        </motion.div>

        {/* Value Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}