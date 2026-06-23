import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    profileImage: {
      type: String,
      default: ""
    },

    portfolioCount: {
      type: Number,
      default: 0
    },

    trustScore: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model(
  "Vendor",
  vendorSchema
);

export default Vendor;