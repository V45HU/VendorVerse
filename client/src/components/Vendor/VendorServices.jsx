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

const serviceIcons = {
  "Wedding Photography": Camera,
  "Pre-Wedding Shoots": Heart,
  "Candid Photography": Image,
  "Cinematic Films": Video,
  "Destination Weddings": Plane,
  "Traditional Photography": Sparkles,
  "Premium Album": Album,
  "Event Coverage": Users,
};

function VendorServices({ vendor }) {
  return (
    <section className="bg-white rounded-3xl shadow-md border border-slate-100 p-8 mt-8">
      <h2 className="text-3xl font-bold text-slate-900">Services Offered</h2>

      <p className="text-slate-500 mt-2 mb-8">
        {vendor.services?.length > 0
          ? `${vendor.services.length} services offered by ${vendor.name}.`
          : "No services added yet."}
      </p>

      {vendor.services?.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {vendor.services.map((service, index) => {
            const Icon = serviceIcons[service] || Camera;

            return (
              <div
                key={index}
                className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-200
            p-5
            hover:border-emerald-400
            hover:bg-emerald-50
            transition
          "
              >
                <div
                  className="
              w-12
              h-12
              rounded-xl
              bg-emerald-100
              flex
              items-center
              justify-center
            "
                >
                  <Icon size={22} className="text-emerald-600" />
                </div>

                <span className="font-medium text-slate-700">{service}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="
      rounded-2xl
      border-2
      border-dashed
      border-slate-200
      py-16
      text-center
    "
        >
          <Camera className="mx-auto text-emerald-500" size={48} />

          <h3 className="mt-5 text-xl font-semibold">Services Coming Soon</h3>

          <p className="text-slate-500 mt-2">
            This vendor hasn't added any services yet.
          </p>
        </div>
      )}
    </section>
  );
}

export default VendorServices;
