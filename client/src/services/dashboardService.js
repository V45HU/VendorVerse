import API from "../api/axios";

/* --------------------------
   Vendor Dashboard
--------------------------- */

export const getVendorDashboard = async () => {
  const response = await API.get("/dashboard/vendor");

  return response.data;
};

/* --------------------------
   Customer Dashboard
--------------------------- */

export const getCustomerDashboard = async () => {
  const response = await API.get("/dashboard/customer");

  return response.data;
};

/* --------------------------
   Admin Dashboard
--------------------------- */

export const getAdminDashboard = async () => {
  const response = await API.get("/dashboard/admin");

  return response.data;
};
