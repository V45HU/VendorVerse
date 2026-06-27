import {
  ShieldCheck,
  Lock,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Vendors",
    text:
      "Every vendor goes through a verification process before appearing on VendorVerse."
  },
  {
    icon: Lock,
    title: "Safe & Transparent",
    text:
      "Clear profiles, genuine information and trustworthy communication for every booking."
  },
  {
    icon: Headphones,
    title: "Local Support",
    text:
      "Helping customers connect with trusted professionals across Chhattisgarh."
  }
];

function CTA() {
  return (
    <section className="bg-slate-50 py-28">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="uppercase tracking-[0.3em] text-emerald-600 font-semibold">
            WHY CHOOSE US
          </span>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Built Around Trust
          </h2>

          <p className="mt-6 text-slate-500 max-w-2xl mx-auto">
            VendorVerse helps customers discover reliable local vendors
            with confidence.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition duration-300"
              >

                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">

                  <Icon
                    size={34}
                    className="text-emerald-600"
                  />

                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {feature.title}
                </h3>

                <p className="text-slate-500 leading-7 mt-5">
                  {feature.text}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default CTA;