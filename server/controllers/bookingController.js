import Booking from "../models/Booking.js";
import Vendor from "../models/Vendor.js";

//
// Create Booking
//
export const createBooking = async (req, res) => {
  try {
    const {
      vendorId,
      eventType,
      eventDate,
      city,
      venue,
      guestCount,
      budget,
      requirements,
    } = req.body;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    const booking = await Booking.create({
      customerId: req.user._id,

      vendorId,

      eventType,
      eventDate,
      city,
      venue,
      guestCount,
      budget,
      requirements,
    });

    res.status(201).json({
      message: "Booking request sent successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Customer Bookings
//
export const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customerId: req.user._id,
    })
      .populate("vendorId", "businessName category city profileImage")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Vendor Bookings
//
export const getVendorBookings = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    const bookings = await Booking.find({
      vendorId: vendor._id,
    })
      .populate("customerId", "name email profileImage")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Single Booking
//
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customerId")
      .populate("vendorId");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Vendor Updates Status
//
export const updateBookingStatus = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    booking.status = req.body.status || booking.status;

    booking.vendorNotes = req.body.vendorNotes || booking.vendorNotes;

    booking.quotation = req.body.quotation || booking.quotation;

    booking.meetingDate = req.body.meetingDate || booking.meetingDate;

    await booking.save();

    //
    // Update Vendor Stats
    //
    if (booking.status === "Completed") {
      vendor.completedBookings += 1;

      vendor.trustScore += 10;

      await vendor.save();
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//
// Customer Deletes Booking
//
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Booking.findByIdAndDelete(booking._id);

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
