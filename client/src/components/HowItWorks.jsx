import {
  Search,
  Scale,
  CalendarCheck2,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search",
    description:
      "Browse verified vendors by category, city and service."
  },
  {
    icon: Scale,
    title: "Compare",
    description:
      "Compare ratings, portfolios and services before choosing."
  },
  {
    icon: CalendarCheck2,
    title: "Book",
    description:
      "Contact the vendor and finalize your booking with confidence."
  }
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-28 scroll-mt-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="uppercase tracking-[0.3em] text-emerald-600 font-semibold">
            How It Works
          </span>

          <h2 className="text-5xl font-bold mt-4 text-slate-900">
            Find Your Vendor
            <br />
            In Three Easy Steps
          </h2>

          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            VendorVerse makes discovering trusted local professionals
            simple, transparent and hassle-free.
          </p>

        </div>

        <div className="relative mt-24">

          {/* timeline */}

          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-emerald-100"></div>

          <div className="grid lg:grid-cols-3 gap-12 relative">

            {steps.map((step) => {

              const Icon = step.icon;

              return (

                <div
                  key={step.title}
                  className="text-center"
                >

                  <div className="mx-auto w-24 h-24 rounded-full bg-emerald-50 border-8 border-white shadow-lg flex items-center justify-center relative z-10">

                    <Icon
                      size={36}
                      className="text-emerald-600"
                    />

                  </div>

                  <h3 className="text-2xl font-bold mt-8">
                    {step.title}
                  </h3>

                  <p className="text-slate-500 mt-4 leading-7 px-6">
                    {step.description}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;
