import {
  Camera,
  UtensilsCrossed,
  PartyPopper,
  Sparkles,
  Music,
  Mic2,
  Building2,
  Car,
} from "lucide-react";

const categories = [
  {
    icon: Camera,
    name: "Photography",
    vendors: 120,
  },
  {
    icon: UtensilsCrossed,
    name: "Catering",
    vendors: 65,
  },
  {
    icon: PartyPopper,
    name: "Decoration",
    vendors: 45,
  },
  {
    icon: Sparkles,
    name: "Makeup",
    vendors: 80,
  },
  {
    icon: Music,
    name: "DJ",
    vendors: 30,
  },
  {
    icon: Mic2,
    name: "Anchor",
    vendors: 20,
  },
  {
    icon: Building2,
    name: "Venue",
    vendors: 50,
  },
  {
    icon: Car,
    name: "Transport",
    vendors: 25,
  },
];

function Categories() {
  return (
    <section id="categories" className="py-24 bg-gray-50 scroll-mt-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-emerald-600 font-semibold uppercase tracking-widest">
            Browse Categories
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Everything You Need
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Explore verified professionals across multiple categories
            for weddings, birthdays, corporate events, and home services.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {categories.map((category) => {

            const Icon = category.icon;

            return (

              <div
                key={category.name}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition
                  duration-300
                  cursor-pointer
                "
              >

                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">

                  <Icon
                    size={30}
                    className="text-emerald-600"
                  />

                </div>

                <h3 className="text-xl font-bold">
                  {category.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {category.vendors} Vendors
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Categories;
