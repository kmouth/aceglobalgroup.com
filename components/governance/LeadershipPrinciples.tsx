"use client";

import { motion } from "framer-motion";
import {
  Eye,
  ShieldCheck,
  Lightbulb,
  Users,
  Target,
  Award,
} from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Visionary Leadership",
    description:
      "We make decisions with a long-term perspective, positioning ACE Global Group for sustainable growth across Africa and global markets.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Every action is guided by honesty, accountability and responsible corporate conduct that builds lasting stakeholder trust.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuous innovation enables us to improve operations, embrace new opportunities and remain competitive in evolving industries.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Strong partnerships with employees, communities, governments and investors drive shared success and inclusive development.",
  },
  {
    icon: Target,
    title: "Accountability",
    description:
      "Clear governance structures ensure measurable performance, responsible leadership and disciplined execution.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We pursue excellence in every project, delivering quality, resilience and long-term value across our diversified businesses.",
  },
];

export default function LeadershipPrinciples() {
  return (
    <section className="bg-slate-50 py-32">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
              LEADERSHIP PRINCIPLES
            </span>

            <h2 className="mt-6 text-5xl font-black text-slate-900">
              Leadership That Creates
              <br />
              Lasting Impact
            </h2>

            <p className="mt-8 text-lg leading-9 text-slate-600">
              At ACE Global Group, leadership is more than directing
              operations. It is about inspiring confidence, embracing
              innovation and making responsible decisions that generate
              sustainable value for our stakeholders and communities.
            </p>

            <div className="mt-12 rounded-3xl border border-emerald-200 bg-white p-8 shadow-sm">

              <h3 className="text-2xl font-bold text-slate-900">
                Executive Commitment
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                Our executive leadership team is committed to transparent
                governance, ethical business practices and disciplined
                execution, ensuring that every strategic initiative
                contributes to long-term prosperity.
              </p>

            </div>
          </motion.div>

          <div className="grid gap-6">

            {principles.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="group flex items-start gap-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                    <Icon className="h-8 w-8 text-emerald-700 transition group-hover:text-white" />

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-8 text-slate-600">
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