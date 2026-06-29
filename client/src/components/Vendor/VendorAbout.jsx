import {
  Camera,
  Heart,
  Video,
  Plane,
  Image,
  Sparkles,
} from "lucide-react";

const specialties = [
  {
    icon: Camera,
    title: "Wedding Photography",
  },
  {
    icon: Heart,
    title: "Pre-Wedding Shoots",
  },
  {
    icon: Image,
    title: "Candid Photography",
  },
  {
    icon: Video,
    title: "Cinematic Films",
  },
  {
    icon: Plane,
    title: "Destination Weddings",
  },
  {
    icon: Sparkles,
    title: "Traditional Photography",
  },
];

function VendorAbout() {
  return (
    <section className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">

      {/* Heading */}

      <h2 className="text-3xl font-bold text-slate-900">

        About

      </h2>

      {/* Description */}

      <p className="mt-6 text-slate-600 leading-8">

        Pixel Photography Studio is one of Chhattisgarh's trusted
        wedding photography teams specializing in candid moments,
        cinematic wedding films, destination weddings, engagement
        shoots and premium event coverage.

        We believe every celebration deserves timeless memories.
        Our experienced photographers combine creativity,
        storytelling and modern editing techniques to deliver
        photographs that remain beautiful for years.

      </p>

      {/* Divider */}

      <div className="border-t border-slate-200 my-8"></div>

      {/* Specialization */}

      <h3 className="font-semibold text-slate-800 mb-5">

        Specializations

      </h3>

      <div className="flex flex-wrap gap-4">

        {specialties.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >

              <Icon
                size={18}
                className="text-emerald-600"
              />

              <span className="text-sm font-medium text-slate-700">

                {item.title}

              </span>

            </div>

          );

        })}

      </div>

    </section>
  );
}

export default VendorAbout;