import API from "../api/axios";

/*
|--------------------------------------------------------------------------
| Convert backend Vendor model
| into frontend Vendor model
|--------------------------------------------------------------------------
*/

const mapVendor = (vendor) => ({
  // Basic Info
  _id: vendor._id,
  id: vendor._id,
  name: vendor.businessName,
  slug: vendor.businessSlug,

  // Category
  category: vendor.category,
  city: vendor.city,
  address: vendor.address,

  // Description
  description: vendor.description,

  // Contact
  phone: vendor.phone,
  whatsapp: vendor.whatsapp,
  email: vendor.email,
  website: vendor.website,

  // Images
  profileImage: vendor.profileImage,
  coverImage: vendor.coverImage,

  // Business Details
  experience: vendor.experience,
  startingPrice: vendor.startingPrice,
  responseTime: vendor.responseTime,
  languages: vendor.languages,
  services: vendor.services,
  workingHours: vendor.workingHours,

  // Social Links
  instagram: vendor.instagram,
  facebook: vendor.facebook,
  youtube: vendor.youtube,

  // Location
  latitude: vendor.latitude,
  longitude: vendor.longitude,

  // Stats
  rating: vendor.rating,
  totalReviews: vendor.totalReviews,
  portfolioCount: vendor.portfolioCount,
  completedBookings: vendor.completedBookings,
  profileViews: vendor.profileViews,
  trustScore: vendor.trustScore,

  // Flags
  verified: vendor.isVerified,
  approved: vendor.isApproved,
  featured: vendor.isFeatured,

  createdAt: vendor.createdAt,
});

/*
|--------------------------------------------------------------------------
| Get Vendor by ID
|--------------------------------------------------------------------------
*/

export const getVendorById = async (id) => {
  const response = await API.get(`/vendors/${id}`);

  return mapVendor(response.data);
};

/*
|--------------------------------------------------------------------------
| Get Portfolio
|--------------------------------------------------------------------------
*/

const mapPortfolio = (items) => {
  return items.map((item) => ({
    id: item._id,

    title: item.title,

    image: item.imageUrl,

    description: item.description,

    createdAt: item.createdAt,
  }));
};

export const getVendorPortfolio = async (id) => {
  const response = await API.get(`/vendors/${id}/portfolio`);

  return mapPortfolio(response.data);
};
