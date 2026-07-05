import API from "../api/axios";

// ---------------------------
// Vendor Bookings
// ---------------------------

export const getVendorBookings = async (status = "") => {
  const url = status ? `/bookings/vendor?status=${status}` : "/bookings/vendor";

  const response = await API.get(url);

  return response.data;
};

// ---------------------------
// Update Status
// ---------------------------

export const updateBookingStatus = async (bookingId, status) => {
  const response = await API.put(`/bookings/${bookingId}/status`, {
    status,
  });

  return response.data;
};

// ---------------------------
// Send Quotation
// ---------------------------

export const sendQuotation = async (bookingId, quotation, vendorNotes) => {
  const response = await API.put(`/bookings/${bookingId}/quotation`, {
    quotation,
    vendorNotes,
  });

  return response.data;
};

// ---------------------------
// Schedule Meeting
// ---------------------------

export const scheduleMeeting = async (bookingId, meetingDate) => {
  const response = await API.put(`/bookings/${bookingId}/meeting`, {
    meetingDate,
  });

  return response.data;
};
