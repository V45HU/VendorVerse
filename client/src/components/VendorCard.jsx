import { Link } from "react-router-dom";

function VendorCard({ vendor }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <h2>{vendor.businessName}</h2>

      <p>
        Category: {vendor.category}
      </p>

      <p>
        City: {vendor.city}
      </p>

      <Link to={`/vendors/${vendor._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default VendorCard;