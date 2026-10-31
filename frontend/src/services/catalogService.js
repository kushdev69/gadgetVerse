import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" }
});

export const getCategories = async () => (await api.get("/catalog/categories")).data;
export const getProducts = async (params = {}) => (await api.get("/catalog/products", { params })).data;
export const getProduct = async productCode => (await api.get(`/catalog/products/${productCode}`)).data;
