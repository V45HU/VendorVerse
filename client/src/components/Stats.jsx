import {
  Users,
  MapPinned,
  Star,
  Briefcase,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "250+",
    label: "Verified Vendors",
  },
  {
    icon: MapPinned,
    value: "35+",
    label: "Cities Covered",
  },
  {
    icon: Star,
    value: "500+",
    label: "Happy Customers",
  },
  {
    icon: Briefcase,
    value: "15+",
    label: "Vendor Categories",
  },
];

function Stats() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-emerald-600 font-semibold uppercase tracking-widest">
            VendorVerse In Numbers
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            Trusted Across Chhattisgarh
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Connecting customers with trusted local vendors for every
            celebration, business event, and home service.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-xl
                  transition
                  duration-300
                  p-8
                  text-center
                "
              >

                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    rounded-full
                    bg-emerald-50
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                >
                  <Icon
                    size={30}
                    className="text-emerald-600"
                  />
                </div>

                <h3 className="text-4xl font-bold text-gray-900">
                  {item.value}
                </h3>

                <p className="mt-3 text-gray-500">
                  {item.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Stats;