"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Quality Assurance",
    description:
      "Every product undergoes rigorous quality checks to ensure consistency and international compliance.",
  },
  {
    title: "Premium Standards",
    description:
      "Our products are carefully sourced, processed and packaged to satisfy both local and export markets.",
  },
  {
    title: "Reliable Supply Chain",
    description:
      "Integrated logistics and efficient distribution ensure timely and dependable deliveries.",
  },
  {
    title: "Sustainable Sourcing",
    description:
      "We partner with responsible farmers and producers to promote environmentally sustainable practices.",
  },
];

export default function WhyChooseProducts() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Why Choose ACE
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            Trusted Products. Reliable Partnerships.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We combine premium quality, dependable logistics and
            sustainable sourcing to deliver products you can trust.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-700">
                ✓
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}