import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" }
});

export const adminSignin = credentials => api.post("/admin/signin", credentials);

export const createAdminProduct = (product, token) => api.post("/admin/products", product, {
  headers: { Authorization: `Bearer ${token}` }
});
