"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  CalendarDays,
  RefreshCcw,
  Users,
  FileArchive,
} from "lucide-react";

const standards = [
  {
    icon: FileCheck2,
    title: "Official Publication",
    description:
      "Every document published by ACE Global Group undergoes internal review and executive approval before release.",
  },
  {
    icon: CalendarDays,
    title: "Publication Date",
    description:
      "Each publication clearly displays its release date and official version number for reference.",
  },
  {
    icon: RefreshCcw,
    title: "Revision History",
    description:
      "Updated editions replace previous versions while maintaining a documented publication history.",
  },
  {
    icon: Users,
    title: "Intended Audience",
    description:
      "Documents are prepared for investors, financial institutions, governments, development agencies and strategic partners.",
  },
  {
    icon: FileArchive,
    title: "Available Formats",
    description:
      "Official publications are released in PDF for presentation and DOCX where editable reference copies are appropriate.",
  },
  {
    icon: ShieldCheck,
    title: "Corporate Authenticity",
    description:
      "Every publication is issued under the authority of ACE Global Group Headquarters and follows our corporate publication standards.",
  },
];

export default function DownloadGuide() {
  return (
    <section className="bg-slate-950 py-28 text-white">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400">
            PUBLICATION STANDARDS
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Corporate Document Integrity
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            ACE Global Group maintains rigorous publication standards to
            ensure every document reflects our commitment to transparency,
            governance, accountability and professional excellence.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {standards.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:bg-white/10"
              >

                <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-emerald-600 p-5">

                  <Icon className="h-8 w-8 text-white" />

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

        {/* Official Notice */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 p-10 text-center"
        >

          <h3 className="text-3xl font-black text-white">
            Official Publication Notice
          </h3>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-slate-300">
            All publications available through this portal are official
            publications of ACE Global Group and are intended for
            investors, financial institutions, development partners,
            government agencies and stakeholders seeking authoritative
            information about the Group.
          </p>

          <div className="mt-10 inline-flex rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold uppercase tracking-[0.3em]">
            Published by ACE Global Group Headquarters
          </div>

        </motion.div>

      </div>

    </section>
  );
}