import { Star, MapPin, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function VendorCard({ vendor }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-100">
      {/* Image */}

      <div className="relative">
        <img
          src={
            vendor.profileImage ||
            "https://placehold.co/600x400/e2e8f0/64748b?text=VendorVerse"
          }
          alt={vendor.businessName}
          className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Category */}

        <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          {vendor.category}
        </span>

        {/* Verified */}

        {vendor.isApproved && (
          <span className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs">
            <CheckCircle size={14} />
            Verified
          </span>
        )}
      </div>

      {/* Content */}

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {vendor.businessName}
            </h3>

            <div className="flex items-center gap-2 mt-2 text-slate-500">
              <MapPin size={16} />

              {vendor.city}
            </div>
          </div>

          <div className="flex items-center gap-1 text-yellow-500 font-semibold">
            <Star fill="currentColor" size={18} />

            {Number(vendor.rating).toFixed(1)}
          </div>
        </div>

        <p className="mt-5 text-slate-500 line-clamp-2">{vendor.description}</p>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-slate-500">
            {vendor.portfolioCount} Portfolio Items
          </span>

          <Link
            to={`/vendors/${vendor._id}`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VendorCard;
