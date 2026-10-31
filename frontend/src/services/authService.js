import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" }
});

export const register = async (userData) => {
    return api.post("/auth/signup", userData);
}

export const login = async (userData) => {
    return api.post("/auth/signin", userData);
}