import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";

import {
  createVendorProfile,
  getMyVendorProfile,
  updateVendorProfile,
  getAllVendors,
  searchVendors,
  getVendorById,
} from "../controllers/vendorController.js";

import { getVendorPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/profile", protect, authorize("vendor"), createVendorProfile);

router.get("/profile", protect, authorize("vendor"), getMyVendorProfile);

router.get("/all", getAllVendors);

router.get("/search", searchVendors);

router.put("/profile", protect, authorize("vendor"), updateVendorProfile);

router.get("/:id/portfolio", getVendorPortfolio);

router.get("/:id", getVendorById);

export default router;
