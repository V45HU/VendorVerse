import API from "../api/axios";

// Get all reviews of a vendor
export const getVendorReviews = async (vendorId) => {
  const response = await API.get(`/reviews/vendor/${vendorId}`);

  return response.data;
};

// Create Review
export const createReview = async (reviewData) => {
  const response = await API.post("/reviews", reviewData);

  return response.data;
};

// Update Review
export const updateReview = async (reviewId, reviewData) => {
  const response = await API.put(`/reviews/${reviewId}`, reviewData);

  return response.data;
};

// Delete Review
export const deleteReview = async (reviewId) => {
  const response = await API.delete(`/reviews/${reviewId}`);

  return response.data;
};
