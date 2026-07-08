"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  Factory,
  Wheat,
  Ship,
} from "lucide-react";

const opportunities = [
  {
    icon: Wheat,
    title: "Agriculture & Food Security",
    description:
      "Developing modern agricultural value chains that improve productivity, food security and export potential.",
  },
  {
    icon: Ship,
    title: "Logistics & Supply Chain",
    description:
      "Delivering integrated logistics and supply chain solutions that connect businesses across Africa and global markets.",
  },
  {
    icon: Factory,
    title: "Industrial Development",
    description:
      "Investing in manufacturing and value-added industries that create jobs and strengthen regional economies.",
  },
  {
    icon: Landmark,
    title: "Strategic Investments",
    description:
      "Partnering with institutions, governments and private investors to unlock sustainable long-term opportunities.",
  },
];

export default function InvestmentOpportunities() {
  return (
    <section className="bg-slate-950 py-32 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
            Investment Opportunities
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Investing In Africa's
            <br />
            Future Together
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            ACE Global Group welcomes partnerships with investors,
            development finance institutions, governments and businesses
            committed to sustainable economic growth.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">

          {opportunities.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:bg-emerald-600/10"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600">

                  <Icon className="h-8 w-8" />

                </div>

                <h3 className="mt-8 text-3xl font-bold">

                  {item.title}

                </h3>

                <p className="mt-6 leading-8 text-slate-300">

                  {item.description}

                </p>

              </motion.div>

            );

          })}

        </div>

        <div className="mt-20 text-center">

          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold transition hover:bg-emerald-700"
          >
            Discuss Investment Opportunities

            <ArrowRight className="ml-3 h-5 w-5" />

          </Link>

        </div>

      </div>
    </section>
  );
}