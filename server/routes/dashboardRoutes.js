import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";

import {
  deleteUser,
  deleteVendor,
  getAdminAnalytics,
  getAdminBookings,
  getAdminDashboard,
  getAdminUsers,
  getAdminVendors,
  getCustomerDashboard,
  getVendorDashboard,
  toggleVendorVisibility,
  updateAdminProfile,
  updateBookingStatusByAdmin,
  updateUserRole,
  updateVendorApproval,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/customer", protect, authorize("customer"), getCustomerDashboard);
router.get("/admin", protect, authorize("admin"), getAdminDashboard);
router.get("/admin/users", protect, authorize("admin"), getAdminUsers);
router.get("/admin/vendors", protect, authorize("admin"), getAdminVendors);
router.get("/admin/bookings", protect, authorize("admin"), getAdminBookings);
router.get("/admin/analytics", protect, authorize("admin"), getAdminAnalytics);
router.put("/admin/profile", protect, authorize("admin"), updateAdminProfile);
router.patch(
  "/admin/users/:id/role",
  protect,
  authorize("admin"),
  updateUserRole,
);
router.delete("/admin/users/:id", protect, authorize("admin"), deleteUser);
router.delete("/admin/vendors/:id", protect, authorize("admin"), deleteVendor);
router.patch(
  "/admin/vendors/:id/approve",
  protect,
  authorize("admin"),
  updateVendorApproval,
);
router.patch(
  "/admin/vendors/:id/visibility",
  protect,
  authorize("admin"),
  toggleVendorVisibility,
);
router.patch(
  "/admin/bookings/:id/status",
  protect,
  authorize("admin"),
  updateBookingStatusByAdmin,
);
router.get("/vendor", protect, authorize("vendor"), getVendorDashboard);

export default router;
