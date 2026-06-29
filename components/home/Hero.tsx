import Link from "next/link";
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/80 to-green-900/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 pt-28 pb-20">

        <div className="max-w-3xl">

          <span className="inline-flex items-center rounded-full bg-yellow-500/90 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-black shadow-lg">
            Agriculture • Logistics • Innovation
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Building Africa's Future
            <br />
            Through Agriculture,
            <br />
            Logistics & Innovation.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-green-100 md:text-xl">
            ACE GLOBAL GROUP is building an integrated ecosystem that
            connects farming, food processing, distribution,
            aquaculture and logistics, delivering premium products
            across Nigeria and international markets with integrity,
            innovation and operational excellence.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <button className="rounded-xl bg-yellow-500 px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400">
              Explore Our Businesses
            </button>

            <button className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-green-900">
              Become a Strategic Partner
            </button>

          </div>

          <div className="mt-16">

            <p className="animate-bounce text-sm uppercase tracking-[0.35em] text-green-100">
              ↓ Discover More
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}