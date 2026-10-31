import { randomUUID } from "node:crypto";
import { Product } from "../model/product.schema.js";

export const adminSessions = new Set();

export const adminSignin = (req, res) => {
  const username = String(req.body.username ?? "").trim();
  const password = String(req.body.password ?? "");

  if (username !== "admin" || password !== "admin123") {
    return res.status(401).json({ message: "Invalid admin username or password" });
  }

  const token = randomUUID();
  adminSessions.add(token);
  return res.json({ token, username: "admin" });
};

export const createProduct = async (req, res) => {
  const {
    productCode,
    category,
    name,
    description,
    price,
    originalPrice,
    image,
    features,
    stock,
    badge,
    isFeatured
  } = req.body;

  const images = Array.isArray(image) ? image : [image];
  if (!productCode || !category || !name || !description || !price || !originalPrice ||
      images.some(item => !String(item ?? "").trim())) {
    return res.status(400).json({
      message: "Product code, category, name, description, prices, and image are required"
    });
  }

  try {
    const product = await Product.create({
      productCode: Number(productCode),
      category: String(category).trim().toLowerCase(),
      name: String(name).trim(),
      description: String(description).trim(),
      price: Number(price),
      originalPrice: Number(originalPrice),
      images: images.map(item => String(item).trim()),
      features: Array.isArray(features)
        ? features.map(item => String(item).trim()).filter(Boolean)
        : String(features ?? "").split(",").map(item => item.trim()).filter(Boolean),
      stock: Number(stock ?? 0),
      badge: String(badge ?? "").trim(),
      isFeatured: Boolean(isFeatured)
    });

    return res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "A product with that code already exists" });
    }
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error(`Product creation failed: ${error.message}`);
    return res.status(500).json({ message: "Unable to create product" });
  }
};
