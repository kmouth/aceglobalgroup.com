"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Globe2,
  Leaf,
  TrendingUp,
  Handshake,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "6+",
    title: "Strategic Business Sectors",
    description:
      "Diversified operations across key industries driving sustainable growth.",
  },
  {
    icon: Globe2,
    value: "Africa",
    title: "Regional Focus",
    description:
      "Building businesses that strengthen African economies and global partnerships.",
  },
  {
    icon: Leaf,
    value: "100%",
    title: "Sustainability Commitment",
    description:
      "Responsible business practices remain central to every investment we pursue.",
  },
  {
    icon: TrendingUp,
    value: "2030",
    title: "Growth Vision",
    description:
      "Executing a long-term strategy focused on innovation and value creation.",
  },
  {
    icon: Handshake,
    value: "Global",
    title: "Strategic Partnerships",
    description:
      "Creating opportunities through collaboration with investors and institutions.",
  },
];

export default function ExecutiveStats() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
            ACE GLOBAL GROUP
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Building Businesses.
            <br />
            Creating Lasting Impact.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-slate-600">
            Our diversified portfolio is built around sustainable
            development, innovation and strategic investments that
            contribute to economic growth across Africa and beyond.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-emerald-400 hover:shadow-2xl"
              >

                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

                  <Icon className="h-8 w-8 text-emerald-700" />

                </div>

                <h3 className="text-5xl font-black text-emerald-700">

                  {item.value}

                </h3>

                <h4 className="mt-5 text-xl font-bold text-slate-900">

                  {item.title}

                </h4>

                <p className="mt-4 leading-8 text-slate-600">

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