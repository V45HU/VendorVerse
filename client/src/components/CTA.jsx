import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-white py-28">

      <div className="max-w-7xl mx-auto px-6">

        <div className="rounded-[40px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 overflow-hidden">

          <div className="px-10 md:px-20 py-20 text-center">

            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Ready to Find
              <br />
              Your Perfect Vendor?
            </h2>

            <p className="mt-8 text-lg text-emerald-50 max-w-3xl mx-auto leading-8">
              Discover trusted photographers, decorators, caterers,
              makeup artists, DJs and many more across Chhattisgarh.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

              <Link
                to="/vendors"
                className="bg-white text-emerald-700 font-semibold px-8 py-4 rounded-full hover:scale-105 transition"
              >
                Browse Vendors
              </Link>

              <Link
                to="/register"
                className="border border-white/50 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-emerald-700 transition"
              >
                Become a Vendor

                <ArrowRight size={18}/>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;