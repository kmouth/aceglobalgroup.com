import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden pt-40 pb-28 text-white">

      {/* Background */}
      <div className="absolute inset-0">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/logistics-hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/70" />

      </div>

      <div className="relative mx-auto flex max-w-7xl items-center px-6 lg:px-8">

        <div className="max-w-3xl">

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Integrated Logistics
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl xl:text-7xl">
            Connecting Africa
            <br />
            To Global Markets.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">
            ACE Global Group delivers dependable transportation,
            warehousing and supply chain solutions for businesses
            across Africa and international markets.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <Link
              href="/contact"
              className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold transition hover:bg-emerald-700"
            >
              Request Logistics Support
            </Link>

            <Link
              href="/services"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-slate-900"
            >
              View Services
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}