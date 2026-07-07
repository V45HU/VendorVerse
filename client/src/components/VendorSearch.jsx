import { Search } from "lucide-react";

function VendorSearch({
  filters,
  onFiltersChange,
  onSearch,
  categories,
  cities,
}) {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Browse Vendors
          </span>

          <h1 className="mt-4 text-5xl font-bold text-slate-900">
            Find Your Perfect Vendor
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
            Explore trusted photographers, caterers, decorators, makeup artists,
            and more across Chhattisgarh.
          </p>
        </div>

        <div className="mt-14 rounded-3xl bg-white p-6 shadow-lg">
          <div className="grid gap-4 lg:grid-cols-4">
            <input
              type="text"
              value={filters.query}
              onChange={(e) =>
                onFiltersChange({ ...filters, query: e.target.value })
              }
              placeholder="Search vendor name or category"
              className="rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
            />

            <select
              value={filters.category}
              onChange={(e) =>
                onFiltersChange({ ...filters, category: e.target.value })
              }
              className="rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filters.city}
              onChange={(e) =>
                onFiltersChange({ ...filters, city: e.target.value })
              }
              className="rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <button
              onClick={onSearch}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.slice(0, 5).map((item) => (
            <button
              key={item}
              onClick={() => onFiltersChange({ ...filters, category: item })}
              className="rounded-full bg-emerald-100 px-5 py-2 text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
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
