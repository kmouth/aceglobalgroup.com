"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Scale,
  Lock,
  Briefcase,
  FileCheck,
  Download,
} from "lucide-react";

const policies = [
  {
    icon: FileText,
    title: "Corporate Governance Policy",
    description:
      "Defines the governance framework, board oversight and executive accountability across ACE Global Group.",
    file: "/documents/governance-manual.pdf",
  },
  {
    icon: Scale,
    title: "Code of Ethics",
    description:
      "Our commitment to ethical conduct, integrity and responsible decision-making throughout the organisation.",
    file: "/documents/company-profile.pdf",
  },
  {
    icon: Shield,
    title: "Anti-Corruption Policy",
    description:
      "Maintaining a zero-tolerance approach to bribery, corruption and unethical business practices.",
    file: "/documents/governance-manual.pdf",
  },
  {
    icon: FileCheck,
    title: "Whistleblower Policy",
    description:
      "Providing secure and confidential reporting channels that promote accountability and transparency.",
    file: "/documents/governance-manual.pdf",
  },
  {
    icon: Briefcase,
    title: "Procurement Policy",
    description:
      "Ensuring fair, transparent and value-driven procurement processes across all business operations.",
    file: "/documents/company-profile.pdf",
  },
  {
    icon: Lock,
    title: "Data Protection Policy",
    description:
      "Protecting corporate and stakeholder information through strong privacy and cybersecurity standards.",
    file: "/documents/company-profile.pdf",
  },
];

export default function CorporatePolicies() {
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
            CORPORATE POLICIES
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Policies That Strengthen
            <br />
            Responsible Governance
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Our governance policies establish the standards that guide
            ethical leadership, compliance, operational excellence and
            long-term stakeholder confidence throughout ACE Global Group.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {policies.map((policy, index) => {

            const Icon = policy.icon;

            return (

              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                  <Icon className="h-8 w-8 text-emerald-700 transition group-hover:text-white" />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {policy.title}
                </h3>

                <p className="mt-5 flex-grow leading-8 text-slate-600">
                  {policy.description}
                </p>

                <Link
                  href={policy.file}
                  target="_blank"
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Download className="mr-3 h-5 w-5" />
                  Download Policy
                </Link>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}