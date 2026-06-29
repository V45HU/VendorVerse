import API from "../api/axios";

/*
|--------------------------------------------------------------------------
| Convert backend Vendor model
| into frontend Vendor model
|--------------------------------------------------------------------------
*/

const mapVendor = (vendor) => ({
  id: vendor._id,

  name: vendor.businessName,

  category: vendor.category,

  city: vendor.city,

  phone: vendor.phone,

  description: vendor.description,

  rating: vendor.rating,

  totalReviews: vendor.totalReviews,

  profileImage: vendor.profileImage,

  portfolioCount: vendor.portfolioCount,

  verified: vendor.isApproved,

  trustScore: vendor.trustScore,
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

export const getVendorPortfolio = async (id) => {

  const response = await API.get(
    `/vendors/${id}/portfolio`
  );

  return response.data;

};