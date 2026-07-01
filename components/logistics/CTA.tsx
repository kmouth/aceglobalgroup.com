import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-emerald-900 py-24 text-white">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-black md:text-5xl">
          Ready to Move Your Business Forward?
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-emerald-100">
          Whether you require transportation, warehousing or complete
          supply chain solutions, ACE Global Group is ready to support
          your business with dependable logistics services.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">

          <Link
            href="/contact"
            className="rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-slate-900 transition hover:bg-yellow-400"
          >
            Request Logistics Support
          </Link>

          <Link
            href="/services"
            className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-emerald-900"
          >
            Explore Our Services
          </Link>

        </div>

      </div>

    </section>
  );
}