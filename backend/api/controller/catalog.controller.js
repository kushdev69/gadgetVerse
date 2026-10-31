import { Category } from "../model/category.schema.js";
import { Product } from "../model/product.schema.js";

const toProductDto = product => ({
  id: product.productCode,
  category: product.category,
  name: product.name,
  description: product.description,
  price: product.price,
  originalPrice: product.originalPrice,
  badge: product.badge || undefined,
  image: product.images[0],
  images: product.images,
  features: product.features,
  rating: product.rating,
  reviews: product.reviews,
  stock: product.stock
});

export const listCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
  const counts = await Product.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);
  const countBySlug = new Map(counts.map(item => [item._id, item.count]));
  res.json(categories.map(category => ({ ...category, count: countBySlug.get(category.slug) || 0 })));
};

export const listProducts = async (req, res) => {
  const { category, featured, sort = "featured" } = req.query;
  const query = { isActive: true };
  if (category) query.category = String(category).toLowerCase();
  if (featured === "true") query.isFeatured = true;

  const sortMap = {
    featured: { isFeatured: -1, createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 }
  };
  const products = await Product.find(query).sort(sortMap[sort] || sortMap.featured).lean();
  res.json(products.map(toProductDto));
};

export const getProduct = async (req, res) => {
  const productCode = Number(req.params.productCode);
  if (!Number.isInteger(productCode)) return res.status(400).json({ message: "Invalid product code" });
  const product = await Product.findOne({ productCode, isActive: true }).lean();
  if (!product) return res.status(404).json({ message: "Product not found" });
  return res.json(toProductDto(product));
};

export const getCatalogError = (error, req, res, next) => {
  console.error(`Catalog request failed: ${error.message}`);
  return res.status(500).json({ message: "Unable to load catalog right now" });
};
