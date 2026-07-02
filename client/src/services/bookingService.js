import API from "../api/axios";

export const createBooking = async (bookingData) => {
  const { data } = await API.post("/bookings", bookingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const getMyBookings = async () => {
  const { data } = await API.get("/bookings/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const getVendorBookings = async () => {
  const { data } = await API.get("/bookings/vendor", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const updateBookingStatus = async (id, booking) => {
  const { data } = await API.patch(`/bookings/${id}/status`, booking, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const deleteBooking = async (id) => {
  const { data } = await API.delete(`/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};
