"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  MessagesSquare,
  ClipboardCheck,
  Landmark,
  Handshake,
  Rocket,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    icon: MessagesSquare,
    title: "Submit an Enquiry",
    description:
      "Introduce your organisation, investment objectives and preferred partnership model.",
  },
  {
    icon: FileSearch,
    title: "Initial Assessment",
    description:
      "Our Investor Relations team evaluates the opportunity and schedules preliminary discussions.",
  },
  {
    icon: ClipboardCheck,
    title: "Due Diligence",
    description:
      "Exchange documentation, project information and conduct commercial and legal assessments.",
  },
  {
    icon: Landmark,
    title: "Executive Review",
    description:
      "Senior management reviews strategic alignment and investment feasibility.",
  },
  {
    icon: Handshake,
    title: "Partnership Agreement",
    description:
      "Formal agreements are negotiated and executed under approved governance processes.",
  },
  {
    icon: Rocket,
    title: "Project Execution",
    description:
      "Capital deployment begins with project mobilisation and implementation milestones.",
  },
  {
    icon: BarChart3,
    title: "Performance Reporting",
    description:
      "Partners receive structured updates, governance reporting and performance reviews.",
  },
];

export default function InvestmentProcess() {
  return (
    <section className="bg-white py-32">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity:0,y:40 }}
          whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.7 }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
            INVESTMENT PROCESS
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            From Interest To Partnership
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Our investment process is transparent, structured and designed
            to establish long-term partnerships built on trust,
            accountability and measurable results.
          </p>

        </motion.div>

        <div className="relative">

          <div className="absolute left-8 top-0 hidden h-full w-1 rounded-full bg-emerald-200 lg:block" />

          <div className="space-y-10">

            {steps.map((step,index)=>{

              const Icon = step.icon;

              return(

                <motion.div
                  key={step.title}
                  initial={{opacity:0,x:-40}}
                  whileInView={{opacity:1,x:0}}
                  viewport={{once:true}}
                  transition={{
                    duration:.6,
                    delay:index*.08,
                  }}
                  className="relative flex gap-8"
                >

                  <div className="hidden lg:flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">

                    <Icon size={28}/>

                  </div>

                  <div className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:bg-white hover:shadow-xl">

                    <span className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">

                      Step {index+1}

                    </span>

                    <h3 className="mt-4 text-3xl font-bold text-slate-900">

                      {step.title}

                    </h3>

                    <p className="mt-5 leading-8 text-slate-600">

                      {step.description}

                    </p>

                  </div>

                </motion.div>

              )

            })}

          </div>

        </div>

      </div>

    </section>
  );
}