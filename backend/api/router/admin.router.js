import express from "express";
import { adminSignin, createProduct } from "../controller/admin.controller.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/signin", adminSignin);
router.post("/products", requireAdmin, createProduct);

export default router;
