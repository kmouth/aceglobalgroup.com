export default function ContactInfo() {
  const contacts = [
    {
      title: "Office Address",
      value: "Rivers, Nigeria",
    },
    {
      title: "Email",
      value: "info@aceglobalgroup.com",
    },
    {
      title: "Phone",
      value: "+234 XXX XXX XXXX",
    },
    {
      title: "Business Hours",
      value: "Mon - Fri | 8:00 AM - 5:00 PM",
    },
  ];

  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Get In Touch
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            We're Ready To Help
          </h2>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {contacts.map((item) => (

            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm transition hover:shadow-lg"
            >

              <h3 className="text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-4 text-slate-600">
                {item.value}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}