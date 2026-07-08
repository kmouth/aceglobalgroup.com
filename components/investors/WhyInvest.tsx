"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Globe2,
  Landmark,
  Leaf,
  Users,
  Building2,
  BarChart3,
} from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Strong Corporate Governance",
    description:
      "Our governance framework promotes transparency, accountability and responsible decision-making across all operations.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Business Model",
    description:
      "Our diversified portfolio is designed for sustainable expansion and resilient long-term growth.",
  },
  {
    icon: Globe2,
    title: "Regional Expansion",
    description:
      "We are strategically positioned to expand across West Africa before entering wider African and global markets.",
  },
  {
    icon: Landmark,
    title: "Institutional Partnerships",
    description:
      "We collaborate with governments, DFIs, commercial banks and private investors to deliver transformative projects.",
  },
  {
    icon: Leaf,
    title: "ESG Commitment",
    description:
      "Sustainability is embedded in our investment decisions, operations and community impact programmes.",
  },
  {
    icon: Users,
    title: "Experienced Leadership",
    description:
      "Our leadership team combines entrepreneurial vision with disciplined execution and strategic partnerships.",
  },
  {
    icon: Building2,
    title: "Diversified Portfolio",
    description:
      "Agriculture, logistics, manufacturing, infrastructure and technology create balanced long-term opportunities.",
  },
  {
    icon: BarChart3,
    title: "Long-Term Value Creation",
    description:
      "Every project is selected to create measurable economic, social and financial value for stakeholders.",
  },
];

export default function WhyInvest() {
  return (
    <section className="bg-slate-950 py-32 text-white">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
            WHY ACE GLOBAL GROUP
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Why Invest With Us
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            We combine responsible governance, scalable industries,
            sustainable growth and strategic partnerships to deliver
            long-term value across Africa.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {pillars.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .08,
                }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-3 hover:border-emerald-500 hover:bg-white/10"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600">

                  <Icon className="h-8 w-8" />

                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-300">
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