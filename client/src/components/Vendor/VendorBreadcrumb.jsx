import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function VendorBreadcrumb() {
  return (
    <section className="bg-slate-50 border-b border-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <Link
            to="/"
            className="hover:text-emerald-600"
          >
            Home
          </Link>

          <ChevronRight size={16} />

          <Link
            to="/vendors"
            className="hover:text-emerald-600"
          >
            Vendors
          </Link>

          <ChevronRight size={16} />

          <span className="font-medium text-slate-800">
            Pixel Photography Studio
          </span>

        </div>

      </div>

    </section>
  );
}

export default VendorBreadcrumb;