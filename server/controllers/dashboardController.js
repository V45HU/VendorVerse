import bcrypt from "bcryptjs";

import Vendor from "../models/Vendor.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import Portfolio from "../models/Portfolio.js";
import User from "../models/User.js";

export const getCustomerDashboard = async (req, res) => {
  try {
    const [totalBookings, completedBookings, reviewsCount, spentResult] =
      await Promise.all([
        Booking.countDocuments({
          customerId: req.user._id,
        }),

        Booking.countDocuments({
          customerId: req.user._id,
          status: "Completed",
        }),

        Review.countDocuments({
          userId: req.user._id,
        }),

        Booking.aggregate([
          {
            $match: {
              customerId: req.user._id,
              status: "Completed",
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$budget" },
            },
          },
        ]),
      ]);

    const [recentBookings, recentReviews] = await Promise.all([
      Booking.find({
        customerId: req.user._id,
      })
        .populate("vendorId", "businessName category city profileImage")
        .sort({ createdAt: -1 })
        .limit(5),

      Review.find({
        userId: req.user._id,
      })
        .populate("vendorId", "businessName category")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const totalSpent = spentResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalBookings,
        completedBookings,
        activeBookings: totalBookings - completedBookings,
        reviewsCount,
        totalSpent,
        favoriteCount: 0,
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

export const getAdminDashboard = async (req, res) => {
  try {
    const [
      userCount,
      vendorCount,
      bookingCount,
      reviewCount,
      recentUsers,
      recentBookings,
      pendingVendors,
    ] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      Vendor.countDocuments(),
      Booking.countDocuments(),
      Review.countDocuments(),
      User.find({ role: "customer" })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email createdAt"),
      Booking.find()
        .populate("customerId", "name email")
        .populate("vendorId", "businessName")
        .sort({ createdAt: -1 })
        .limit(5),
      Vendor.find({ isApproved: false })
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const pendingBookings = await Booking.countDocuments({ status: "Pending" });
    const completedBookings = await Booking.countDocuments({
      status: "Completed",
    });

    res.status(200).json({
      success: true,
      stats: {
        userCount,
        vendorCount,
        bookingCount,
        reviewCount,
        pendingBookings,
        completedBookings,
      },
      recentUsers,
      recentBookings,
      pendingVendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateVendorApproval = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const vendor = await Vendor.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    vendor.isApproved = Boolean(isApproved);
    vendor.isFeatured = vendor.isApproved ? vendor.isFeatured : false;
    await vendor.save();

    res.status(200).json({
      success: true,
      message: vendor.isApproved ? "Vendor approved" : "Vendor rejected",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleVendorVisibility = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    vendor.isApproved = Boolean(req.body.isApproved ?? vendor.isApproved);
    vendor.isFeatured = Boolean(req.body.isFeatured ?? vendor.isFeatured);
    await vendor.save();

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBookingStatusByAdmin = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = req.body.status;
    await booking.save();

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["customer", "vendor", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "A valid role is required",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin users cannot be deleted from this panel",
      });
    }

    const vendor = await Vendor.findOne({ userId: user._id });

    if (vendor) {
      await Promise.all([
        Booking.deleteMany({ vendorId: vendor._id }),
        Review.deleteMany({ vendorId: vendor._id }),
        Portfolio.deleteMany({ vendorId: vendor._id }),
        Vendor.findByIdAndDelete(vendor._id),
      ]);
    }

    await Promise.all([
      Booking.deleteMany({ customerId: user._id }),
      Review.deleteMany({ userId: user._id }),
      User.findByIdAndDelete(user._id),
    ]);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate(
      "userId",
      "_id",
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    await Promise.all([
      Booking.deleteMany({ vendorId: vendor._id }),
      Review.deleteMany({ vendorId: vendor._id }),
      Portfolio.deleteMany({ vendorId: vendor._id }),
      Vendor.findByIdAndDelete(vendor._id),
    ]);

    if (vendor.userId) {
      await User.findByIdAndUpdate(vendor.userId._id, { role: "customer" });
    }

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId", "name email")
      .populate("vendorId", "businessName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminAnalytics = async (req, res) => {
  try {
    const [users, vendors, bookings, reviews] = await Promise.all([
      User.countDocuments(),
      Vendor.countDocuments(),
      Booking.countDocuments(),
      Review.countDocuments(),
    ]);

    const [
      pendingBookings,
      acceptedBookings,
      completedBookings,
      rejectedBookings,
      approvedVendors,
      featuredVendors,
      roleBreakdown,
      monthlyBookings,
      topCategories,
      recentBookings,
    ] = await Promise.all([
      Booking.countDocuments({ status: "Pending" }),
      Booking.countDocuments({ status: "Accepted" }),
      Booking.countDocuments({ status: "Completed" }),
      Booking.countDocuments({ status: "Rejected" }),
      Vendor.countDocuments({ isApproved: true }),
      Vendor.countDocuments({ isFeatured: true }),
      User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]),
      Booking.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 6 },
      ]),
      Vendor.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      Booking.find()
        .populate("customerId", "name")
        .populate("vendorId", "businessName")
        .sort({ createdAt: -1 })
        .limit(8),
    ]);

    const roleSummary = { customer: 0, vendor: 0, admin: 0 };
    roleBreakdown.forEach((entry) => {
      if (roleSummary[entry._id] !== undefined) {
        roleSummary[entry._id] = entry.count;
      }
    });

    const monthlyTrend = monthlyBookings.map((entry) => ({
      label: new Date(entry._id.year, entry._id.month - 1, 1).toLocaleString(
        "default",
        { month: "short" },
      ),
      count: entry.count,
    }));

    res.status(200).json({
      success: true,
      analytics: {
        totals: {
          users,
          vendors,
          bookings,
          reviews,
        },
        bookingsByStatus: {
          pending: pendingBookings,
          accepted: acceptedBookings,
          completed: completedBookings,
          rejected: rejectedBookings,
        },
        vendorStatus: {
          approved: approvedVendors,
          featured: featuredVendors,
        },
        roleBreakdown: roleSummary,
        monthlyTrend,
        topCategories,
        recentBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
