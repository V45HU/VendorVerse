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

export const getMyVendorProfile = async (
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

    res.status(200).json(vendor);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateVendorProfile = async (
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

    vendor.businessName =
      req.body.businessName ||
      vendor.businessName;

    vendor.category =
      req.body.category ||
      vendor.category;

    vendor.city =
      req.body.city ||
      vendor.city;

    vendor.phone =
      req.body.phone ||
      vendor.phone;

    vendor.description =
      req.body.description ||
      vendor.description;

    const updatedVendor =
      await vendor.save();

    res.status(200).json({
      message:
        "Vendor Profile Updated Successfully",
      vendor: updatedVendor,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};