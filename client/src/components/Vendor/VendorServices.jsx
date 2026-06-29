import {
  Camera,
  Heart,
  Image,
  Video,
  Plane,
  Sparkles,
  Album,
  Users,
} from "lucide-react";

const services = [
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
  {
    icon: Album,
    title: "Premium Album",
  },
  {
    icon: Users,
    title: "Event Coverage",
  },
];

function VendorServices() {
  return (
    <section className="bg-white rounded-3xl shadow-md border border-slate-100 p-8 mt-8">

      <h2 className="text-3xl font-bold text-slate-900">
        Services Offered
      </h2>

      <p className="text-slate-500 mt-2 mb-8">
        Complete photography solutions for every celebration.
      </p>

      <div className="grid md:grid-cols-2 gap-5">

        {services.map((service, index) => {

          const Icon = service.icon;

          return (

            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 hover:border-emerald-400 hover:bg-emerald-50 transition"
            >

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

                <Icon
                  size={22}
                  className="text-emerald-600"
                />

              </div>

              <span className="font-medium text-slate-700">
                {service.title}
              </span>

            </div>

          );
        })}

      </div>

    </section>
  );
}

export default VendorServices;