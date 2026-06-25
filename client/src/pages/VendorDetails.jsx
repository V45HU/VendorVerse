import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function VendorDetails() {

  const { id } = useParams();

  const [vendor, setVendor] = useState(null);

  useEffect(() => {

    const fetchVendor = async () => {

      try {

        const res = await API.get(`/vendors/${id}`);

        setVendor(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchVendor();

  }, [id]);

  if (!vendor) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h1>{vendor.businessName}</h1>

      <p><strong>Category:</strong> {vendor.category}</p>

      <p><strong>City:</strong> {vendor.city}</p>

      <p><strong>Description:</strong> {vendor.description}</p>

      <p><strong>Rating:</strong> {vendor.rating}</p>

      <p><strong>Portfolio Items:</strong> {vendor.portfolioCount}</p>

    </div>
  );

}

export default VendorDetails;