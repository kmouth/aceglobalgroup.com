"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Who can invest with ACE Global Group?",
    a: "We welcome institutional investors, development finance institutions, commercial banks, private equity firms, governments and qualified strategic partners.",
  },
  {
    q: "What sectors do you operate in?",
    a: "Agriculture, aquaculture, logistics, manufacturing, infrastructure, technology and related value chains.",
  },
  {
    q: "Do you support Public-Private Partnerships?",
    a: "Yes. ACE Global Group actively explores PPP opportunities with governments and development institutions.",
  },
  {
    q: "Can international investors participate?",
    a: "Yes. We welcome cross-border strategic partnerships that align with our long-term vision and governance standards.",
  },
  {
    q: "How do I begin discussions?",
    a: "Simply contact our Investor Relations team through the contact page to schedule an introductory meeting.",
  },
];

export default function FAQs() {
  return (
    <section className="bg-slate-100 py-32">

      <div className="mx-auto max-w-5xl px-6">

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.7}}
          className="text-center mb-20"
        >

          <HelpCircle className="mx-auto h-14 w-14 text-emerald-600"/>

          <h2 className="mt-8 text-5xl font-black text-slate-900">

            Frequently Asked Questions

          </h2>

        </motion.div>

        <div className="space-y-6">

          {faqs.map((faq)=>(

            <div
              key={faq.q}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >

              <h3 className="text-xl font-bold text-slate-900">

                {faq.q}

              </h3>

              <p className="mt-4 leading-8 text-slate-600">

                {faq.a}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}