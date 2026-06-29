import { Search } from "lucide-react";

function VendorSearch() {
  return (
    <section className="bg-slate-50 py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="uppercase tracking-[0.3em] text-emerald-600 font-semibold">
            Browse Vendors
          </span>

          <h1 className="text-5xl font-bold text-slate-900 mt-4">
            Find Your Perfect Vendor
          </h1>

          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Explore trusted photographers, caterers, decorators,
            makeup artists and more across Chhattisgarh.
          </p>

        </div>

        {/* Search Box */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mt-14">

          <div className="grid lg:grid-cols-4 gap-4">

            {/* Search */}

            <input
              type="text"
              placeholder="Search vendor..."
              className="border rounded-xl px-5 py-4 outline-none focus:border-emerald-500"
            />

            {/* Category */}

            <select
              className="border rounded-xl px-5 py-4 outline-none focus:border-emerald-500"
            >
              <option>All Categories</option>
              <option>Photographer</option>
              <option>Catering</option>
              <option>Decoration</option>
              <option>Makeup</option>
              <option>DJ</option>
            </select>

            {/* City */}

            <select
              className="border rounded-xl px-5 py-4 outline-none focus:border-emerald-500"
            >
              <option>All Cities</option>
              <option>Bhilai</option>
              <option>Raipur</option>
              <option>Durg</option>
            </select>

            {/* Button */}

            <button
              className="bg-emerald-600 hover:bg-emerald-700 transition rounded-xl text-white font-semibold flex justify-center items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>

          </div>

        </div>

        {/* Popular */}

        <div className="flex flex-wrap justify-center gap-4 mt-8">

          {[
            "Photography",
            "Catering",
            "Decoration",
            "Makeup",
            "DJ",
          ].map((item) => (

            <button
              key={item}
              className="bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition"
            >
              {item}
            </button>

          ))}

        </div>

      </div>

    </section>
  );
}

export default VendorSearch;