import { useEffect, useState } from "react";

import VendorCard from "./VendorCard";
import { getAllVendors } from "../api/vendorApi";

function FeaturedVendors() {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {

    const fetchVendors = async () => {

      try {

        const data = await getAllVendors();

        setVendors(data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchVendors();

  }, []);

  return (

    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>

            <h2 className="text-4xl font-bold">
              Featured Vendors
            </h2>

            <p className="text-gray-500 mt-2">
              Trusted professionals from your city.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {vendors.map((vendor) => (

            <VendorCard
              key={vendor._id}
              vendor={vendor}
            />

          ))}

        </div>

      </div>

    </section>

  );
}

export default FeaturedVendors;