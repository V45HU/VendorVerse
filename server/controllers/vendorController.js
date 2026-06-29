import mongoose from "mongoose";
import Vendor from "../models/Vendor.js";
import generateSlug from "../utils/generateSlug.js";

export const createVendorProfile = async (req, res) => {
  try {
    const {
      businessName,
      category,
      city,
      address,
      phone,
      whatsapp,
      email,
      website,
      description,
      profileImage,
      coverImage,
      experience,
      startingPrice,
      responseTime,
      languages,
      services,
      workingHours,
      instagram,
      facebook,
      youtube,
      latitude,
      longitude,
    } = req.body;

    const existingVendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (existingVendor) {
      return res.status(400).json({
        message: "Vendor Profile Already Exists",
      });
    }

    const vendor = await Vendor.create({
      userId: req.user._id,

      businessName,
      category,
      city,
      address,

      phone,
      whatsapp,
      email,
      website,

      description,

      profileImage,
      coverImage,

      experience,
      startingPrice,
      responseTime,

      languages,
      services,

      workingHours,

      instagram,
      facebook,
      youtube,

      latitude,
      longitude,

      businessSlug: generateSlug(businessName),
    });

    res.status(201).json({
      message: "Vendor Profile Created Successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyVendorProfile = async (req, res) => {
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

export const updateVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor Profile Not Found",
      });
    }

    // Copy incoming fields
    Object.assign(vendor, req.body);

    // Regenerate slug if business name changed
    if (req.body.businessName) {
      vendor.businessSlug = generateSlug(req.body.businessName);
    }

    const updatedVendor = await vendor.save();

    res.status(200).json({
      message: "Vendor Profile Updated Successfully",
      vendor: updatedVendor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchVendors = async (req, res) => {
  try {
    const { city, category } = req.query;

    let query = {};

    if (city) {
      query.city = {
        $regex: city,
        $options: "i",
      };
    }

    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }

    const vendors = await Vendor.find(query);

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Vendor ID",
      });
    }

    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor Not Found",
      });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
