import Vendor from "../models/Vendor.js";

export const createVendorProfile = async (
  req,
  res
) => {
  try {

    const {
      businessName,
      category,
      city,
      phone,
      description,
    } = req.body;

    const existingVendor =
      await Vendor.findOne({
        userId: req.user._id,
      });

    if (existingVendor) {
      return res.status(400).json({
        message:
          "Vendor Profile Already Exists",
      });
    }

    const vendor =
      await Vendor.create({
        userId: req.user._id,
        businessName,
        category,
        city,
        phone,
        description,
      });

    res.status(201).json({
      message:
        "Vendor Profile Created Successfully",
      vendor,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};