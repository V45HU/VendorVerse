import { useEffect, useState } from "react";

import { getVendorBookings } from "../services/bookingDashboardService";

function useVendorBookings(status = "") {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const data = await getVendorBookings(status);

      setBookings(data.bookings);

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [status]);

  return {
    bookings,
    loading,
    error,
    refreshBookings: loadBookings,
  };
}

export default useVendorBookings;
