export default function Industries() {
  const industries = [
    "Agriculture",
    "Manufacturing",
    "Food Processing",
    "Import & Export",
    "Retail & Distribution",
    "Government Projects",
    "NGOs & Development Partners",
    "International Trade",
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Industries We Serve
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            Supporting Businesses Across Multiple Sectors
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our logistics network supports organizations of every size,
            delivering dependable transportation and supply chain solutions.
          </p>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {industries.map((industry) => (

            <div
              key={industry}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center font-semibold text-slate-800 transition duration-300 hover:border-emerald-600 hover:bg-emerald-50"
            >
              {industry}
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}