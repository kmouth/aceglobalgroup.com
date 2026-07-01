import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[65vh] overflow-hidden pt-40 pb-24 text-white">

      <div className="absolute inset-0">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/contact-hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/75" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="max-w-3xl">

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Contact ACE Global Group
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl">
            Let's Build
            <br />
            The Future Together.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">
            Whether you're seeking partnership opportunities,
            logistics support, agricultural products or business
            solutions, our team is ready to assist.
          </p>

          <div className="mt-10">
            <Link
              href="#contact-form"
              className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold transition hover:bg-emerald-700"
            >
              Send Us a Message
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}