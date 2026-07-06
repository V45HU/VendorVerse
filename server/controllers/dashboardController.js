import Vendor from "../models/Vendor.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import Portfolio from "../models/Portfolio.js";

export const getVendorDashboard = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "This vendor has not registered a business account yet.",
      });
    }

    const [
      pendingBookings,
      completedBookings,
      portfolioCount,
      reviews,
      recentBookings,
      recentReviews,
    ] = await Promise.all([
      Booking.countDocuments({
        vendorId: vendor._id,
        status: "Pending",
      }),

      Booking.countDocuments({
        vendorId: vendor._id,
        status: "Completed",
      }),

      Portfolio.countDocuments({
        vendorId: vendor._id,
      }),

      Review.find({
        vendorId: vendor._id,
      }),

      Booking.find({
        vendorId: vendor._id,
      })
        .populate("customerId", "name email")
        .sort({ createdAt: -1 })
        .limit(5),

      Review.find({
        vendorId: vendor._id,
      })
        .populate("userId", "name")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1);

    res.status(200).json({
      success: true,

      vendor,

      stats: {
        pendingBookings,
        completedBookings,
        portfolioCount,
        totalReviews,
        averageRating,
      },

      recentBookings,

      recentReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
