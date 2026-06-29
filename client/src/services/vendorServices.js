import API from "../api/axios";

export const getVendorById = async (id) => {
  const response = await API.get(`/vendors/${id}`);
  return response.data;
};

export const getVendorPortfolio = async (id) => {
  const response = await API.get(
    `/vendors/${id}/portfolio`
  );
  return response.data;
};