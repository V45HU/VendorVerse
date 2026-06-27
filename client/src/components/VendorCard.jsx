import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";

function VendorCard({ vendor }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* Image */}

      <div className="h-56 bg-gray-100 flex items-center justify-center">

    <ImageIcon
        size={70}
        className="text-gray-300"
    />

</div>

      {/* Content */}

      <div className="p-6">

        <div className="flex justify-between items-center">

          <h3 className="text-xl font-bold">
            {vendor.businessName}
          </h3>

          <span className="text-yellow-500 font-semibold">
            ⭐ {vendor.rating}
          </span>

        </div>

        <p className="text-emerald-600 mt-2 font-medium">
          {vendor.category}
        </p>

        <div className="flex justify-between mt-3 text-sm text-gray-500">

    <span>📍 {vendor.city}</span>

    <span>{vendor.portfolioCount} Works</span>

</div>

        <p className="text-gray-600 mt-4 line-clamp-2">
          {vendor.description}
        </p>

        <Link
          to={`/vendors/${vendor._id}`}
          className="block w-full text-center bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default VendorCard;