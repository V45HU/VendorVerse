import mongoose from "mongoose";
import Vendor from "../models/Vendor.js";
import generateSlug from "../utils/generateSlug.js";

const editableVendorFields = [
  "businessName",
  "category",
  "city",
  "address",
  "phone",
  "whatsapp",
  "email",
  "website",
  "description",
  "profileImage",
  "coverImage",
  "experience",
  "startingPrice",
  "responseTime",
  "languages",
  "services",
  "workingHours",
  "instagram",
  "facebook",
  "youtube",
  "latitude",
  "longitude",
];

const getVendorPayload = (body) => {
  return editableVendorFields.reduce((payload, field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      payload[field] = body[field];
    }

    return payload;
  }, {});
};

const requiredVendorFields = [
  "businessName",
  "category",
  "city",
  "description",
  "phone",
];

export const createVendorProfile = async (req, res) => {
  try {
    const existingVendor = await Vendor.findOne({
      userId: req.user._id,
    });

    if (existingVendor) {
      return res.status(400).json({
        message: "This vendor already has a registered business account.",
      });
    }

    const payload = getVendorPayload(req.body);
    const missingFields = requiredVendorFields.filter(
      (field) => !String(payload[field] ?? "").trim(),
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Please provide: ${missingFields.join(", ")}.`,
      });
    }

    const vendor = await Vendor.create({
      ...payload,
      userId: req.user._id,
      businessSlug: generateSlug(payload.businessName),
    });

    res.status(201).json({
      message: "Vendor Profile Created Successfully",
      vendor,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A business with this name is already registered.",
      });
    }

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
        message: "This vendor has not registered a business account yet.",
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
        message: "This vendor has not registered a business account yet.",
      });
    }

    const payload = getVendorPayload(req.body);

    Object.assign(vendor, payload);

    // Regenerate slug if business name changed
    if (payload.businessName) {
      vendor.businessSlug = generateSlug(payload.businessName);
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
    const { city, category, query } = req.query;

    const searchQuery = {};

    if (city) {
      searchQuery.city = {
        $regex: city,
        $options: "i",
      };
    }

    if (category) {
      searchQuery.category = {
        $regex: category,
        $options: "i",
      };
    }

    if (query) {
      searchQuery.$or = [
        { businessName: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    const vendors = await Vendor.find(searchQuery)
      .sort({ isFeatured: -1, rating: -1, createdAt: -1 })
      .limit(24);

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
