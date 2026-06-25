import { useEffect, useState } from "react";
import API from "../api/axios";
import VendorCard from "../components/VendorCard";

function Vendors() {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {

    const fetchVendors = async () => {

      try {

        const res =
          await API.get("/vendors/all");

        setVendors(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchVendors();

  }, []);

  return (
    <div>

      <h1>All Vendors</h1>

      {vendors.map((vendor) => (
        <VendorCard
          key={vendor._id}
          vendor={vendor}
        />
      ))}

    </div>
  );
}

export default Vendors;