import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import dotenv from "dotenv";
import authRouter from "./api/router/auth.router.js";
import catalogRouter from "./api/router/catalog.router.js";
import adminRouter from "./api/router/admin.router.js";
import cors from "cors";
const app = express();

//  config:
dotenv.config();

//  middlewares
const allowedOrigins = new Set([
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());

//  routes
app.use("/api/auth", authRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req,res)=>{
    res.send("backend is here")
})

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "gadgetverse-api" });
});

app.use((error, req, res, next) => {
  console.error(`Unhandled API error: ${error.message}`);
  res.status(500).json({ message: "An unexpected server error occurred" });
});

export default app;
