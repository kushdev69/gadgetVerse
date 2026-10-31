import express from "express";
import { getProduct, listCategories, listProducts } from "../controller/catalog.controller.js";

const router = express.Router();

router.get("/categories", listCategories);
router.get("/products", listProducts);
router.get("/products/:productCode", getProduct);

export default router;
