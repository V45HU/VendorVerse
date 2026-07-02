import Review from "../models/Review.js";
import Vendor from "../models/Vendor.js";

const updateVendorRating = async (vendorId) => {
  // Fetch all reviews for this vendor
  const reviews = await Review.find({
    vendorId,
  });

  let averageRating = 0;

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    averageRating = totalRating / reviews.length;
  }

  await Vendor.findByIdAndUpdate(
    vendorId,
    {
      rating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
    },
    {
      new: true,
    },
  );
};

export default updateVendorRating;
