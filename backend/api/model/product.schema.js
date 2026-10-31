import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productCode: { type: Number, required: true, unique: true, index: true },
  category: { type: String, required: true, index: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true, min: 0 },
  badge: { type: String, trim: true, default: "" },
  images: {
    type: [{ type: String, trim: true }],
    validate: { validator: value => value.length > 0, message: "At least one product image is required" }
  },
  features: { type: [{ type: String, trim: true }], default: [] },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: { type: Number, min: 0, default: 0 },
  stock: { type: Number, min: 0, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.index({ category: 1, isActive: 1, isFeatured: -1 });

export const Product = mongoose.model("Product", productSchema);
