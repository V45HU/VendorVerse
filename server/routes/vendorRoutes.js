import express from "express";
import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  createVendorProfile,
} from "../controllers/vendorController.js";

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorize("vendor"),
  createVendorProfile
);

export default router;