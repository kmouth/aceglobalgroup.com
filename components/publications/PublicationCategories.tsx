"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  Briefcase,
  Leaf,
  BarChart3,
  Building2,
  FileSpreadsheet,
} from "lucide-react";

const categories = [
  {
    icon: Briefcase,
    title: "Corporate Publications",
    description:
      "Official company profile, corporate overview, organisational structure and executive publications.",
  },
  {
    icon: Landmark,
    title: "Investor Relations",
    description:
      "Investment prospectuses, partnership opportunities and shareholder information.",
  },
  {
    icon: BarChart3,
    title: "Annual Reports",
    description:
      "Performance reports, corporate milestones and financial highlights.",
  },
  {
    icon: Leaf,
    title: "ESG & Sustainability",
    description:
      "Environmental, social and governance commitments together with sustainability reports.",
  },
  {
    icon: Building2,
    title: "Corporate Governance",
    description:
      "Governance framework, policies, ethics and board publications.",
  },
  {
    icon: FileSpreadsheet,
    title: "Strategic Planning",
    description:
      "Long-term development plans, business strategy and Vision 2030 publications.",
  },
];

export default function PublicationCategories() {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">

            DOCUMENT CATEGORIES

          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">

            Organised For Easy Access

          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">

            Every publication is organised into professional categories
            to help investors, institutions and strategic partners
            quickly locate relevant information.

          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category, index) => {

            const Icon = category.icon;

            return (

              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .08,
                }}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:bg-white hover:shadow-2xl"
              >

                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 group-hover:bg-emerald-600 transition">

                  <Icon
                    className="h-10 w-10 text-emerald-700 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">

                  {category.title}

                </h3>

                <p className="mt-5 leading-8 text-slate-600">

                  {category.description}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}