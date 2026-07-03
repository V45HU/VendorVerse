import SearchBar from "./SearchBar";

function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}

          <div>
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium mb-8">
              ✨ Your Trusted Local Marketplace
            </span>

            <h1 className="text-6xl font-extrabold leading-tight max-w-xl text-slate-900">
              Find Trusted
              <br />
              <span className="text-emerald-600">Local Vendors</span>
            </h1>

            <p className="mt-8 text-xl leading-8 text-slate-600 max-w-xl">
              Connect with verified local businesses and talented professionals
              for weddings, birthdays, business events, home services and much
              more.
            </p>

            <SearchBar></SearchBar>
          </div>

          {/* Right Illustration */}

          <div className="flex justify-center">
            <div className="w-full h-[500px] rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100 border border-emerald-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-emerald-600">
                Hero Illustration
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
