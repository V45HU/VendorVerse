import API from "../api/axios";

export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData);

  return response.data;
};

export const loginUser = async (formData) => {
  const response = await API.post("/auth/login", formData);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");

  return response.data;
};
