import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createReview,
  getVendorReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create review

router.post("/", protect, createReview);

// Get vendor reviews

router.get("/vendor/:id", getVendorReviews);

// Update review

router.put("/:id", protect, updateReview);

// Delete review

router.delete("/:id", protect, deleteReview);

export default router;
