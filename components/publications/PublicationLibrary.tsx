"use client";

import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const publications = [
  {
    title: "ACE Global Group Company Profile",
    version: "Version 1.0",
    date: "July 2026",
    size: "PDF • 18 MB",
    status: "Available",
    href: "/documents/company-profile.pdf",
  },
  {
    title: "Strategic Plan 2026–2030",
    version: "Version 1.0",
    date: "Coming Soon",
    size: "PDF",
    status: "Coming Soon",
    href: "#",
  },
  {
    title: "Investment Prospectus",
    version: "Version 1.0",
    date: "Coming Soon",
    size: "PDF",
    status: "Coming Soon",
    href: "#",
  },
  {
    title: "Corporate Governance Manual",
    version: "Version 1.0",
    date: "Coming Soon",
    size: "PDF",
    status: "Coming Soon",
    href: "#",
  },
  {
    title: "Sustainability Report",
    version: "Version 1.0",
    date: "Coming Soon",
    size: "PDF",
    status: "Coming Soon",
    href: "#",
  },
  {
    title: "Annual Corporate Report",
    version: "Version 1.0",
    date: "Coming Soon",
    size: "PDF",
    status: "Coming Soon",
    href: "#",
  },
];

export default function PublicationLibrary() {
  return (
    <section
      id="library"
      className="bg-slate-50 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
            DOCUMENT LIBRARY
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Official Publications
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Browse our official corporate publications, strategic
            reports and investor resources.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {publications.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .08,
              }}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-2xl"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

                  <FileText className="h-8 w-8 text-emerald-700" />

                </div>

                {item.status === "Available" ? (

                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                    <CheckCircle2 className="mr-2 h-4 w-4" />

                    Available

                  </span>

                ) : (

                  <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                    <Clock3 className="mr-2 h-4 w-4" />

                    Coming Soon

                  </span>

                )}

              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <div className="mt-6 space-y-3 text-slate-600">

                <p>{item.version}</p>

                <p>{item.date}</p>

                <p>{item.size}</p>

              </div>

              <a
                href={item.href}
                className={`mt-10 inline-flex items-center rounded-xl px-6 py-3 font-semibold transition ${
                  item.status === "Available"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "cursor-not-allowed bg-slate-200 text-slate-500"
                }`}
              >

                <Download className="mr-3 h-5 w-5" />

                {item.status === "Available"
                  ? "Download"
                  : "Coming Soon"}

              </a>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}