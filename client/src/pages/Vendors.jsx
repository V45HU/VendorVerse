import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import VendorSearch from "../components/VendorSearch";
import VendorGrid from "../components/VendorGrid";
import Footer from "../components/Footer";
import API from "../api/axios";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ query: "", category: "", city: "" });

  const categories = useMemo(() => {
    const allCategories = vendors
      .map((vendor) => vendor.category)
      .filter(Boolean);
    return [...new Set(allCategories)];
  }, [vendors]);

  const cities = useMemo(() => {
    const allCities = vendors.map((vendor) => vendor.city).filter(Boolean);
    return [...new Set(allCities)];
  }, [vendors]);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const response = await API.get("/vendors/search", {
        params: {
          query: filters.query,
          category: filters.category,
          city: filters.city,
        },
      });
      setVendors(response.data || []);
    } catch (error) {
      console.error(error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleSearch = () => {
    loadVendors();
  };

  return (
    <>
      <Navbar />

      <VendorSearch
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        categories={categories}
        cities={cities}
      />

      <VendorGrid vendors={vendors} loading={loading} />

      <Footer />
    </>
  );
}

export default Vendors;
