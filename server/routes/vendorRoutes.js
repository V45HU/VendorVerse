import express from "express";
import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  createVendorProfile,
  getMyVendorProfile,
  updateVendorProfile,
} from "../controllers/vendorController.js";

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorize("vendor"),
  createVendorProfile
);

router.get(
  "/profile",
  protect,
  authorize("vendor"),
  getMyVendorProfile
);

router.put(
  "/profile",
  protect,
  authorize("vendor"),
  updateVendorProfile
);

export default router;