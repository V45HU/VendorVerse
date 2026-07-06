import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    // -----------------------------
    // Owner
    // -----------------------------

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // -----------------------------
    // Business Information
    // -----------------------------

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    businessSlug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    category: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    // -----------------------------
    // Contact
    // -----------------------------

    phone: {
      type: String,
      required: true,
    },

    whatsapp: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    // -----------------------------
    // Images
    // -----------------------------

    profileImage: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    // -----------------------------
    // Vendor Details
    // -----------------------------

    experience: {
      type: Number,
      default: 0,
    },

    startingPrice: {
      type: Number,
      default: 0,
    },

    responseTime: {
      type: String,
      default: "",
    },

    languages: [
      {
        type: String,
      },
    ],

    services: [
      {
        type: String,
      },
    ],

    workingHours: {
      type: String,
      default: "",
    },

    // -----------------------------
    // Social Links
    // -----------------------------

    instagram: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    // -----------------------------
    // Location
    // -----------------------------

    latitude: {
      type: Number,
      default: 0,
    },

    longitude: {
      type: Number,
      default: 0,
    },

    // -----------------------------
    // Platform Stats
    // -----------------------------

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    portfolioCount: {
      type: Number,
      default: 0,
    },

    completedBookings: {
      type: Number,
      default: 0,
    },

    profileViews: {
      type: Number,
      default: 0,
    },

    trustScore: {
      type: Number,
      default: 0,
    },

    // -----------------------------
    // Verification
    // -----------------------------

    isApproved: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
