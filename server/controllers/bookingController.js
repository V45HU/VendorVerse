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
        success: false,
        message: "This vendor has not registered a business account yet.",
      });
    }

    const query = {
      vendorId: vendor._id,
    };

    if (req.query.status) {
      query.status = req.query.status;
    }

    const bookings = await Booking.find(query)
      .populate("customerId", "name email")
      .sort({
        createdAt: -1,
      });

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

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
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

export const sendQuotation = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    booking.quotation = req.body.quotation;

    booking.vendorNotes = req.body.vendorNotes;

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

export const scheduleMeeting = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    booking.meetingDate = req.body.meetingDate;

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
