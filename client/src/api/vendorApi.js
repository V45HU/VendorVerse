import api from "./axios";

export const getAllVendors = async () => {
    try {
        const { data } = await api.get("/vendors/all");
        return data;
    } catch (error) {
        throw error;
    }
};

export const getVendorById = async (id) => {
    try {
        const { data } = await api.get(`/vendors/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const searchVendors = async (city, category) => {
    try {
        const { data } = await api.get(
            `/vendors/search?city=${city}&category=${category}`
        );
        return data;
    } catch (error) {
        throw error;
    }
};