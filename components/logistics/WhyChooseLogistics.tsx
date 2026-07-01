export default function WhyChooseLogistics() {
  const reasons = [
    {
      title: "Reliable Delivery",
      description:
        "We ensure timely movement of goods through dependable transportation and logistics planning.",
    },
    {
      title: "Secure Operations",
      description:
        "Every shipment is handled with professionalism, accountability and care from origin to destination.",
    },
    {
      title: "Global Connectivity",
      description:
        "Our logistics solutions connect African businesses with regional and international markets.",
    },
    {
      title: "Customer-Focused",
      description:
        "Every logistics solution is tailored to meet the operational needs of our clients.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Why Choose ACE Logistics
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            Built on Reliability, Driven by Excellence
          </h2>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {reasons.map((reason) => (

            <div
              key={reason.title}
              className="rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <h3 className="text-xl font-bold text-slate-900">
                {reason.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {reason.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}