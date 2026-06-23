import express from "express";
import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("vendor"),
  (req, res) => {

    res.json({
      message: "Vendor Dashboard Access"
    });

  }
);

export default router;