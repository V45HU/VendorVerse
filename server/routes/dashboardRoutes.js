import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";

import { getVendorDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/vendor", protect, authorize("vendor"), getVendorDashboard);

export default router;
