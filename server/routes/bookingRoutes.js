import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";

import {
  createBooking,
  getCustomerBookings,
  getVendorBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  sendQuotation,
  scheduleMeeting,
} from "../controllers/bookingController.js";

const router = express.Router();

//
// Customer
//

router.post("/", protect, authorize("customer"), createBooking);

router.get("/my", protect, authorize("customer"), getCustomerBookings);

router.delete("/:id", protect, authorize("customer"), deleteBooking);

//
// Vendor
//

router.get("/vendor", protect, authorize("vendor"), getVendorBookings);

router.put("/:id/status", protect, authorize("vendor"), updateBookingStatus);

router.put("/:id/quotation", protect, authorize("vendor"), sendQuotation);

router.put("/:id/meeting", protect, authorize("vendor"), scheduleMeeting);

//
// Shared
//

router.get("/:id", protect, getBookingById);

export default router;
