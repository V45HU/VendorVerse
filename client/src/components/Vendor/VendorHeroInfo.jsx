import {
  CheckCircle2,
  MapPin,
  Share2,
  Star,
} from "lucide-react";

function VendorHeroInfo({vendor}) {
  return (
    <>
      {/* Top Row */}

              <div className="flex justify-between">

                {/* Left */}

                <div className="flex items-start gap-8">

                  {/* Logo */}

                  <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-black">

                    <img
                      src={
                        vendor?.profileImage ||
                        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400"
                      }
                      alt="Vendor Logo"
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Vendor Info */}

                  <div className="pt-2">

                    <div className="flex items-center gap-3">

                      <h1 className="text-5xl font-bold text-slate-900">

                        {vendor.name}

                      </h1>

                      <CheckCircle2
                        className="text-emerald-600"
                        size={28}
                      />

                    </div>

                    {/* Rating */}

                    <div className="flex items-center gap-2 mt-4">

                      <Star
                        size={18}
                        fill="#facc15"
                        className="text-yellow-400"
                      />

                      <span className="font-semibold text-lg">

                        {vendor.rating}

                      </span>

                      <span className="text-slate-500">

                        {vendor.totalReviews} Reviews

                      </span>

                    </div>

                    {/* Category */}

                    <div className="flex items-center gap-3 mt-4 text-slate-600">

                      <span>{vendor.category}</span>

                      <span>•</span>

                      <div className="flex items-center gap-1">

                        <MapPin size={16} />

                        {vendor.city}

                      </div>

                    </div>

                    {/* Verified */}

                    <div className="mt-5">

                      {vendor.verified && (
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                          ✓ Verified Vendor
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                {/* Share */}

                <button
                  className="
                    self-start
                    flex
                    items-center
                    gap-2
                    border
                    border-slate-300
                    rounded-xl
                    px-6
                    py-3
                    hover:bg-slate-50
                    transition
                  "
                >

                  <Share2 size={18} />

                  Share

                </button>

              </div>
    </>
  );
}

export default VendorHeroInfo;