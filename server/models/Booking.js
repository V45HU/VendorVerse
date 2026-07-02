import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Customer

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Vendor

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    // Event Details

    eventType: {
      type: String,
      required: true,
      trim: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    venue: {
      type: String,
      default: "",
      trim: true,
    },

    guestCount: {
      type: Number,
      default: 0,
    },

    budget: {
      type: Number,
      default: 0,
    },

    requirements: {
      type: String,
      default: "",
    },

    // Booking Status

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending",
    },

    // Vendor Response

    quotation: {
      type: Number,
      default: 0,
    },

    vendorNotes: {
      type: String,
      default: "",
    },

    meetingDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
