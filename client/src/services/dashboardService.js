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

export const updateVendorApproval = async (vendorId, isApproved) => {
  const response = await API.patch(
    `/dashboard/admin/vendors/${vendorId}/approve`,
    {
      isApproved,
    },
  );

  return response.data;
};

export const toggleVendorVisibility = async (vendorId, payload) => {
  const response = await API.patch(
    `/dashboard/admin/vendors/${vendorId}/visibility`,
    payload,
  );

  return response.data;
};

export const updateBookingStatusByAdmin = async (bookingId, status) => {
  const response = await API.patch(
    `/dashboard/admin/bookings/${bookingId}/status`,
    {
      status,
    },
  );

  return response.data;
};
