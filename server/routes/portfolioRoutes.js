import express from "express";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  createPortfolioItem,
  getMyPortfolio,
  updatePortfolioItem,
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

router.put(
  "/:id",
  protect,
  authorize("vendor"),
  updatePortfolioItem
);

router.delete(
  "/:id",
  protect,
  authorize("vendor"),
  deletePortfolioItem
);

export default router;
