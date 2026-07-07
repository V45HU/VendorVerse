import { useMemo } from "react";
import VendorCard from "./VendorCard";

function VendorGrid({ vendors, loading }) {
  const featuredVendors = useMemo(
    () => vendors.filter((vendor) => vendor.isFeatured || vendor.isApproved),
    [vendors],
  );

  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl text-center">
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
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-semibold">No Vendors Found</h2>

          <p className="mt-3 text-slate-500">
            We couldn't find any vendors matching your search.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <span className="font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Vendors
          </span>

          <h2 className="mt-3 text-5xl font-bold">Browse Vendors</h2>

          <p className="mt-4 text-slate-500">
            Discover trusted professionals from across Chhattisgarh.
          </p>
        </div>

        {featuredVendors.length > 0 && (
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-800">
                Featured Vendors
              </h3>
              <span className="text-sm text-slate-500">
                Handpicked for quick discovery
              </span>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {featuredVendors.slice(0, 4).map((vendor) => (
                <VendorCard key={vendor._id} vendor={vendor} />
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vendors.map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VendorGrid;
