import SearchBar from "./SearchBar";
import HeroIllustration from "../assets/hero.png";

function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}

          <div>
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium mb-8">
              Your Trusted Local Marketplace
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

            <SearchBar />
          </div>

          {/* Right */}

          <div className="flex justify-center">
            <img
              src={HeroIllustration}
              alt="VendorVerse Illustration"
              className="w-full max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
