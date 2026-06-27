function SearchBar() {
  return (
    <div className="mt-10 max-w-3xl">
      <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col md:flex-row gap-3">

        {/* Category */}

        <select className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Photography</option>
          <option>Catering</option>
          <option>Decoration</option>
          <option>Makeup</option>
          <option>Music</option>
        </select>

        {/* City */}

        <select className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Bhilai</option>
          <option>Raipur</option>
          <option>Durg</option>
        </select>

        {/* Search */}

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-xl font-semibold transition-all">
          Search
        </button>

      </div>

      {/* Popular */}

      <div className="flex flex-wrap items-center gap-3 mt-6">

        <span className="text-gray-500 text-sm">
          Popular:
        </span>

        {[
          "Photography",
          "Catering",
          "Decoration",
          "Makeup",
          "DJ"
        ].map((item) => (
          <button
            key={item}
            className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm hover:bg-emerald-100 transition"
          >
            {item}
          </button>
        ))}

      </div>

    </div>
  );
}

export default SearchBar;