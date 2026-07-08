"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  Building2,
  TrendingUp,
  Landmark,
  Leaf,
  Ship,
} from "lucide-react";

const highlights = [
  {
    icon: Globe2,
    title: "Target Markets",
    value: "Africa",
    description:
      "West Africa today, expanding into Central, East and Southern Africa.",
  },
  {
    icon: Building2,
    title: "Business Sectors",
    value: "6+",
    description:
      "Agriculture, Logistics, Aquaculture, Manufacturing, Infrastructure and Technology.",
  },
  {
    icon: TrendingUp,
    title: "Growth Vision",
    value: "2030",
    description:
      "Building one of Africa's leading diversified enterprise groups.",
  },
  {
    icon: Landmark,
    title: "Partnership Model",
    value: "Public & Private",
    description:
      "Strategic collaboration with governments, DFIs, banks and institutional investors.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    value: "ESG",
    description:
      "Every investment is guided by responsible governance and measurable impact.",
  },
  {
    icon: Ship,
    title: "Regional Connectivity",
    value: "Integrated",
    description:
      "Connecting agriculture, logistics and manufacturing into one scalable ecosystem.",
  },
];

export default function InvestmentHighlights() {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
            INVESTMENT OVERVIEW
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Why Institutional Investors Choose ACE
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Our investment strategy combines resilient industries,
            sustainable growth and long-term partnerships to create
            lasting economic value.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {highlights.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 group-hover:bg-emerald-600 transition">

                  <Icon className="h-8 w-8 text-emerald-700 group-hover:text-white transition" />

                </div>

                <p className="mt-8 text-sm uppercase tracking-[0.25em] text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-3 text-4xl font-black text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-6 leading-8 text-slate-600">
                  {item.description}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}