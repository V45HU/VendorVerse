import { useEffect, useState } from "react";

import { getVendorDashboard } from "../services/dashboardService";

function useDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [errorStatus, setErrorStatus] = useState(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getVendorDashboard();

      setDashboard(data);

      setError(null);

      setErrorStatus(null);
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to load dashboard");

      setErrorStatus(err.response?.status || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    errorStatus,
    refreshDashboard: loadDashboard,
  };
}

export default useDashboard;
