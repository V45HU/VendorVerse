import Portfolio from "../models/Portfolio.js";
import Vendor from "../models/Vendor.js";

export const createPortfolioItem = async (
  req,
  res
) => {
  try {

    const {
      title,
      imageUrl,
      description,
    } = req.body;

    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor Profile Not Found",
      });
    }

    const portfolio =
      await Portfolio.create({
        vendorId: vendor._id,
        title,
        imageUrl,
        description,
      });

    vendor.portfolioCount += 1;

    await vendor.save();

    res.status(201).json({
      message:
        "Portfolio Item Created Successfully",
      portfolio,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getMyPortfolio = async (
  req,
  res
) => {
  try {

    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor Profile Not Found",
      });
    }

    const portfolioItems =
      await Portfolio.find({
        vendorId: vendor._id,
      });

    res.status(200).json(
      portfolioItems
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deletePortfolioItem = async (
  req,
  res
) => {
  try {

    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor Profile Not Found",
      });
    }

    const portfolio =
      await Portfolio.findById(
        req.params.id
      );

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio Not Found",
      });
    }

    if (
      portfolio.vendorId.toString() !==
      vendor._id.toString()
    ) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    await Portfolio.findByIdAndDelete(
      req.params.id
    );

    vendor.portfolioCount -= 1;

    if (vendor.portfolioCount < 0) {
      vendor.portfolioCount = 0;
    }

    await vendor.save();

    res.status(200).json({
      message:
        "Portfolio Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getVendorPortfolio = async (
  req,
  res
) => {
  try {

    const portfolioItems =
      await Portfolio.find({
        vendorId: req.params.id,
      });

    res.status(200).json(
      portfolioItems
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};