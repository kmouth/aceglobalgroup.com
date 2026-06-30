"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Building2,
  Globe2,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "8+",
    title: "Business Sectors",
    description:
      "Diversified operations across multiple industries.",
  },
  {
    icon: Globe2,
    value: "Global",
    title: "Growth Vision",
    description:
      "Creating opportunities across Africa and international markets.",
  },
  {
    icon: BriefcaseBusiness,
    value: "100%",
    title: "Sustainable Focus",
    description:
      "Committed to responsible growth and long-term value creation.",
  },
  {
    icon: Users,
    value: "∞",
    title: "Future Opportunities",
    description:
      "Building partnerships that unlock limitless possibilities.",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mb-20"
        >
            <SectionHeader
  eyebrow="At A Glance"
  title="Growing With Purpose"
  description="..."
/>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">
            At A Glance
          </span>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Growing With Purpose
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Every milestone reflects our commitment to innovation,
            responsible leadership and sustainable enterprise.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-5xl font-black">
                  {stat.value}
                </h3>

                <h4 className="mt-4 text-xl font-semibold">
                  {stat.title}
                </h4>

                <p className="mt-4 leading-7 text-slate-300">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}