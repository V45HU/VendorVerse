import express from "express";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  createPortfolioItem,
  getMyPortfolio,
  deletePortfolioItem,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("vendor"),
  createPortfolioItem,
);

router.get(
  "/",
  protect,
  authorize("vendor"),
  getMyPortfolio
);

router.delete(
  "/:id",
  protect,
  authorize("vendor"),
  deletePortfolioItem
);

export default router;