"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  Fish,
  Factory,
  Globe2,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Agricultural Products",
    icon: Leaf,
    description:
      "Premium crops cultivated and sourced to international quality standards.",
    items: [
      "Maize",
      "Rice",
      "Cassava",
      "Soybeans",
      "Sesame",
      "Ginger",
    ],
  },
  {
    title: "Aquaculture",
    icon: Fish,
    description:
      "Fresh and processed fish products from sustainable aquaculture operations.",
    items: [
      "Fresh Catfish",
      "Smoked Catfish",
      "Fingerlings",
      "Fish Feed",
    ],
  },
  {
    title: "Processed Products",
    icon: Factory,
    description:
      "Value-added food products processed using modern production techniques.",
    items: [
      "Garri",
      "Cassava Flour",
      "Palm Oil",
      "Packaged Foods",
    ],
  },
  {
    title: "Export Commodities",
    icon: Globe2,
    description:
      "Export-ready commodities prepared to meet global market requirements.",
    items: [
      "Cocoa",
      "Cashew",
      "Hibiscus",
      "Ginger",
    ],
  },
];

export default function ProductCategories() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Our Products
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            Product Categories
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We supply high-quality agricultural commodities, aquaculture
            products, processed foods and export-ready products that meet both
            local and international standards.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-emerald-100 p-4">
                    <Icon className="h-8 w-8 text-emerald-700" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {category.title}
                  </h3>
                </div>

                <p className="mt-6 leading-8 text-slate-600">
                  {category.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <ArrowRight className="h-4 w-4 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700"
                  >
                    Enquire About Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href="/payment"
                    className="inline-flex items-center rounded-xl border border-yellow-400 bg-yellow-50 px-5 py-3 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-100"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Make a Payment
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future Marketplace Direction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center md:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Growing With Our Partners
          </p>

          <h3 className="mt-4 text-3xl font-bold text-slate-900">
            Building a Connected Supply Network
          </h3>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
            ACE Global Group is developing a broader ecosystem that will
            connect producers, suppliers, customers and strategic partners
            across our growing network.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex items-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
          >
            Become a Partner
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
