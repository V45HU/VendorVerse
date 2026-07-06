import API from "../api/axios";

const mapPortfolioItem = (item) => ({
  ...item,
  _id: item._id || item.id,
  id: item.id || item._id,
  imageUrl: item.imageUrl || item.image,
});

export const getMyPortfolio = async () => {
  const response = await API.get("/vendors/portfolio");

  return response.data.map(mapPortfolioItem);
};

export const createPortfolioItem = async (payload) => {
  const response = await API.post("/vendors/portfolio", payload);

  return {
    ...response.data,
    portfolio: mapPortfolioItem(response.data.portfolio),
  };
};

export const updatePortfolioItem = async (portfolioId, payload) => {
  const response = await API.put(`/vendors/portfolio/${portfolioId}`, payload);

  return {
    ...response.data,
    portfolio: mapPortfolioItem(response.data.portfolio),
  };
};

export const deletePortfolioItem = async (portfolioId) => {
  const response = await API.delete(`/vendors/portfolio/${portfolioId}`);

  return response.data;
};
