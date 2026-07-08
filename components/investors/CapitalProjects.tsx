"use client";

import { motion } from "framer-motion";
import {
  Fish,
  Warehouse,
  Factory,
  Truck,
  Leaf,
  ArrowUpRight,
} from "lucide-react";

const projects = [
  {
    icon: Fish,
    title: "Commercial Aquaculture Expansion",
    stage: "Growth Phase",
    investment: "Equity Partnership",
    timeline: "18–24 Months",
    impact: "Regional food security and export development.",
    priority: "High Priority",
  },
  {
    icon: Warehouse,
    title: "National Cold Chain Network",
    stage: "Infrastructure Development",
    investment: "Public–Private Partnership",
    timeline: "24–36 Months",
    impact: "Reduce post-harvest losses across agricultural value chains.",
    priority: "Strategic Project",
  },
  {
    icon: Factory,
    title: "Integrated Agro-Processing Hub",
    stage: "Planning Phase",
    investment: "Joint Venture",
    timeline: "30 Months",
    impact: "Value-added processing for local and export markets.",
    priority: "High Growth",
  },
  {
    icon: Truck,
    title: "Smart Logistics Network",
    stage: "Expansion",
    investment: "Institutional Investment",
    timeline: "24 Months",
    impact: "Improve nationwide supply chain efficiency.",
    priority: "Expansion",
  },
  {
    icon: Leaf,
    title: "Renewable Energy Programme",
    stage: "Future Pipeline",
    investment: "Green Finance",
    timeline: "36 Months",
    impact: "Support sustainable industrial operations.",
    priority: "ESG Initiative",
  },
];

export default function CapitalProjects() {
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
            CAPITAL PROJECTS
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Strategic Investment Pipeline
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            ACE Global Group is developing scalable projects designed to
            strengthen food security, logistics, industrial growth and
            sustainable infrastructure across Africa.
          </p>

        </motion.div>

        <div className="space-y-8">

          {projects.map((project, index) => {

            const Icon = project.icon;

            return (

              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-emerald-500 hover:bg-white/10"
              >

                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex gap-6">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600">

                      <Icon className="h-8 w-8" />

                    </div>

                    <div>

                      <h3 className="text-3xl font-bold">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-slate-300 leading-8">
                        {project.impact}
                      </p>

                    </div>

                  </div>

                  <ArrowUpRight className="hidden h-8 w-8 text-emerald-400 lg:block" />

                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                  <div className="rounded-xl bg-slate-900 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                      Stage
                    </p>
                    <p className="mt-2 font-semibold">
                      {project.stage}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                      Investment Model
                    </p>
                    <p className="mt-2 font-semibold">
                      {project.investment}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                      Timeline
                    </p>
                    <p className="mt-2 font-semibold">
                      {project.timeline}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-600 p-5">
                    <p className="text-xs uppercase tracking-[0.2em]">
                      Priority
                    </p>
                    <p className="mt-2 font-semibold">
                      {project.priority}
                    </p>
                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}