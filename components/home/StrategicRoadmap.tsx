"use client";

import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Globe2,
  Target,
  Handshake,
} from "lucide-react";

const roadmap = [
  {
    icon: Building2,
    year: "Phase 01",
    title: "Foundation",
    description:
      "Establishing resilient businesses across agriculture, logistics, manufacturing, aquaculture and strategic services while building a strong operational foundation.",
  },
  {
    icon: TrendingUp,
    year: "Phase 02",
    title: "Expansion",
    description:
      "Scaling operations, strengthening regional supply chains, increasing production capacity and expanding into new African markets.",
  },
  {
    icon: Globe2,
    year: "Phase 03",
    title: "Regional Leadership",
    description:
      "Positioning ACE Global Group among Africa's most respected diversified enterprises through innovation, excellence and sustainable growth.",
  },
  {
    icon: Target,
    year: "Phase 04",
    title: "Global Partnerships",
    description:
      "Building strategic relationships with governments, financial institutions, development agencies and international investors.",
  },
  {
    icon: Handshake,
    year: "Vision 2030",
    title: "Sustainable Legacy",
    description:
      "Creating long-term economic impact through responsible leadership, innovation, sustainable investments and transformational partnerships.",
  },
];

export default function StrategicRoadmap() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
            OUR STRATEGY
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Strategic Roadmap
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Our long-term strategy is focused on sustainable growth,
            innovation and responsible leadership, creating lasting value
            across Africa and international markets.
          </p>
        </motion.div>

        <div className="relative">

          <div className="absolute left-8 top-0 hidden h-full w-1 rounded-full bg-emerald-200 lg:block" />

          <div className="space-y-10">

            {roadmap.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  className="relative flex gap-8"
                >
                  <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg lg:flex">
                    <Icon size={28} />
                  </div>

                  <div className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:bg-white hover:shadow-2xl">

                    <span className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
                      {item.year}
                    </span>

                    <h3 className="mt-4 text-3xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-5 leading-8 text-slate-600">
                      {item.description}
                    </p>

                  </div>
                </motion.div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}