"use client";

import { motion } from "framer-motion";
import {
  Wheat,
  Truck,
  Factory,
  Fish,
  Zap,
  Cpu,
  Landmark,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const portfolio = [
  {
    icon: Wheat,
    company: "ACE Farms",
    sector: "Agriculture",
    stage: "Growth Phase",
    status: "Open for Strategic Investment",
    description:
      "Developing modern commercial agriculture and food security projects across Africa.",
  },
  {
    icon: Truck,
    company: "ACE Logistics",
    sector: "Logistics & Supply Chain",
    stage: "Expansion Phase",
    status: "Infrastructure Development",
    description:
      "Integrated transportation, warehousing and supply chain solutions connecting regional markets.",
  },
  {
    icon: Factory,
    company: "ACE Manufacturing",
    sector: "Industrial Development",
    stage: "Planning Phase",
    status: "Investment Opportunity",
    description:
      "Establishing value-added manufacturing businesses that strengthen African industries.",
  },
  {
    icon: Fish,
    company: "ACE Aquaculture",
    sector: "Food Production",
    stage: "Operational",
    status: "Scaling Production",
    description:
      "Commercial fish farming focused on sustainable production and regional food security.",
  },
  {
    icon: Zap,
    company: "ACE Energy",
    sector: "Renewable Energy",
    stage: "Future Development",
    status: "Project Pipeline",
    description:
      "Exploring renewable energy solutions that support industrial and community growth.",
  },
  {
    icon: Cpu,
    company: "ACE Technologies",
    sector: "Digital Innovation",
    stage: "Research & Development",
    status: "Future Expansion",
    description:
      "Building digital platforms that improve operational efficiency and business transformation.",
  },
  {
    icon: Landmark,
    company: "ACE Capital",
    sector: "Investment Management",
    stage: "Strategic Planning",
    status: "Institutional Partnerships",
    description:
      "Providing investment structures that enable long-term capital deployment and sustainable returns.",
  },
  {
    icon: HeartHandshake,
    company: "ACE Foundation",
    sector: "Corporate Social Impact",
    stage: "Community Development",
    status: "ESG Programme",
    description:
      "Supporting education, entrepreneurship, healthcare and community empowerment initiatives.",
  },
];

export default function BusinessPortfolio() {
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
            BUSINESS PORTFOLIO
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            A Diversified Investment Ecosystem
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            ACE Global Group is building a diversified portfolio of
            businesses designed to create sustainable economic growth,
            resilient operations and long-term value across Africa.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {portfolio.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.07,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-2xl"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 group-hover:bg-emerald-600 transition">

                    <Icon className="h-8 w-8 text-emerald-700 group-hover:text-white transition" />

                  </div>

                  <ArrowUpRight className="text-slate-400 group-hover:text-emerald-600 transition" />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.company}
                </h3>

                <p className="mt-2 font-medium text-emerald-600">
                  {item.sector}
                </p>

                <div className="mt-6 space-y-2 text-sm">

                  <div className="rounded-lg bg-slate-100 px-3 py-2">
                    <strong>Stage:</strong> {item.stage}
                  </div>

                  <div className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700">
                    <strong>Status:</strong> {item.status}
                  </div>

                </div>

                <p className="mt-6 leading-7 text-slate-600">
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