import { useEffect, useState } from "react";
import api from "../api/axios";
import VendorCard from "./VendorCard";

function VendorGrid() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    try {
      const res = await api.get("/vendors/all");
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-slate-700">
            Loading vendors...
          </h2>
        </div>
      </section>
    );
  }

  if (vendors.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">
            No Vendors Found
          </h2>

          <p className="text-slate-500 mt-3">
            We couldn't find any vendors matching your search.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12">

          <span className="uppercase tracking-[0.3em] text-emerald-600 font-semibold">
            Vendors
          </span>

          <h2 className="text-5xl font-bold mt-3">
            Browse Vendors
          </h2>

          <p className="text-slate-500 mt-4">
            Discover trusted professionals from across Chhattisgarh.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

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

export default VendorGrid;