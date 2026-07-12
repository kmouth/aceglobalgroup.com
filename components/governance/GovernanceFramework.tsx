"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Landmark,
  ShieldCheck,
  Scale,
  Users,
  BadgeCheck,
} from "lucide-react";

const framework = [
  {
    icon: Landmark,
    title: "Board Oversight",
    description:
      "The Board provides strategic direction, governance oversight and long-term stewardship for the Group.",
  },
  {
    icon: Building2,
    title: "Executive Management",
    description:
      "Experienced executives execute corporate strategy while ensuring operational excellence and sustainable growth.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description:
      "Enterprise-wide systems identify, assess and manage operational, financial and strategic risks.",
  },
  {
    icon: Scale,
    title: "Ethics & Compliance",
    description:
      "Strong compliance structures promote integrity, accountability and adherence to applicable regulations.",
  },
  {
    icon: Users,
    title: "Stakeholder Engagement",
    description:
      "Transparent communication strengthens relationships with investors, governments, employees and communities.",
  },
  {
    icon: BadgeCheck,
    title: "Continuous Improvement",
    description:
      "Governance processes are regularly reviewed to maintain effectiveness and align with international best practices.",
  },
];

export default function GovernanceFramework() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
            GOVERNANCE FRAMEWORK
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Built On Strong Corporate Governance
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Our governance framework promotes ethical leadership,
            responsible decision-making and disciplined execution,
            ensuring long-term value creation for shareholders,
            partners and communities.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {framework.map((item, index) => {
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
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                  <Icon className="h-8 w-8 text-emerald-700 transition group-hover:text-white" />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
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