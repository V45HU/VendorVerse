import Review from "../models/Review.js";
import Vendor from "../models/Vendor.js";
import updateVendorRating from "../utils/updateVendorRating.js";

// ---------------------------------------------------
// Create Review
// ---------------------------------------------------

export const createReview = async (req, res) => {
  try {
    const { vendorId, title, comment, rating } = req.body;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    const alreadyReviewed = await Review.findOne({
      vendorId,

      userId: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You have already reviewed this vendor.",
      });
    }

    const review = await Review.create({
      vendorId,

      userId: req.user._id,

      title,

      comment,

      rating,
    });

    await updateVendorRating(vendorId);

    res.status(201).json({
      message: "Review added successfully.",

      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------------------------------------------
// Update Review
// ---------------------------------------------------

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    review.title = req.body.title ?? review.title;

    review.comment = req.body.comment ?? review.comment;

    review.rating = req.body.rating ?? review.rating;

    await review.save();

    await updateVendorRating(review.vendorId);

    res.status(200).json({
      message: "Review updated.",

      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------------------------------------------
// Delete Review
// ---------------------------------------------------

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const vendorId = review.vendorId;

    await review.deleteOne();

    await updateVendorRating(vendorId);

    res.status(200).json({
      message: "Review deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------------------------------------------
// Get Vendor Reviews
// ---------------------------------------------------

export const getVendorReviews = async (
  req,

  res,
) => {
  try {
    const reviews = await Review.find({
      vendorId: req.params.id,
    })

      .populate(
        "userId",

        "name profileImage",
      )

      .sort({
        createdAt: -1,
      });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
