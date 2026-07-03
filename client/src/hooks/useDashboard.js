import { useEffect, useState } from "react";

import { getVendorDashboard } from "../services/dashboardService";

function useDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getVendorDashboard();

      setDashboard(data);

      setError(null);
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard: loadDashboard,
  };
}

export default useDashboard;
