import { Category } from "../model/category.schema.js";
import { Product } from "../model/product.schema.js";

const image = (id, width = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const categories = [
  { slug: "smartphones", name: "Smartphones", description: "Find powerful phones with brilliant displays, capable cameras, and dependable battery life.", image: image("photo-1511707171634-5f897ff02aa9"), displayOrder: 1 },
  { slug: "laptops", name: "Laptops", description: "From everyday productivity to demanding creative work, find the right computer for your workflow.", image: image("photo-1496181133206-80ce9b88a853"), displayOrder: 2 },
  { slug: "audio", name: "Audio & Earbuds", description: "Tune into richer sound with wireless earbuds, headphones, microphones, and portable speakers.", image: image("photo-1505740420928-5e560c06d30e"), displayOrder: 3 },
  { slug: "wearables", name: "Smart Wearables", description: "Stay connected and understand your health with smartwatches, trackers, and connected accessories.", image: image("photo-1523275335684-37898b6baf30"), displayOrder: 4 }
];

const products = [
  [1, "smartphones", "Nova X Pro Smartphone", "Flagship performance with a vivid AMOLED display and pro-grade cameras.", 49999, 55999, "Best Seller", "photo-1511707171634-5f897ff02aa9", ["6.7-inch AMOLED Display", "256GB Fast Storage", "Pro Camera System", "5G Connectivity", "1-Year Brand Warranty"], 4.9, 1422, true],
  [2, "smartphones", "PixelEdge 9", "Clean Android experience, all-day battery, and brilliant computational photography.", 39999, 44999, "", "photo-1598327105666-5b89351aff97", ["6.3-inch OLED Display", "128GB Storage", "All-day Battery", "5G Connectivity"], 4.8, 864, true],
  [3, "smartphones", "Core Mini 5G", "Compact 5G phone with smooth performance and a pocket-friendly design.", 18999, 21999, "", "photo-1592899677977-9c10ca588bbd", ["6.1-inch Display", "128GB Storage", "Dual Camera", "Fast Charging"], 4.6, 431, false],
  [4, "smartphones", "Volt Max Ultra", "Fast charging, generous storage, and a cinematic display for everyday entertainment.", 29999, 34999, "", "photo-1551817958-d9d86fb29431", ["6.8-inch Display", "256GB Storage", "120Hz Refresh Rate", "Fast Charging"], 4.7, 598, false],
  [5, "laptops", "AeroBook 14 Laptop", "Lightweight productivity with all-day battery life and a crisp edge-to-edge display.", 72999, 79999, "Trending", "photo-1496181133206-80ce9b88a853", ["14-inch Full HD Display", "16GB RAM + 512GB SSD", "Backlit Keyboard", "Wi-Fi 6 Connectivity", "1-Year Brand Warranty"], 4.8, 955, true],
  [6, "laptops", "ProForge Creator 16", "Powerful creator laptop with dedicated graphics and a color-accurate screen.", 119999, 129999, "", "photo-1531297484001-80022131f5a1", ["16-inch 2.5K Display", "32GB RAM + 1TB SSD", "Dedicated Graphics", "Thunderbolt 4"], 4.9, 402, true],
  [7, "laptops", "FlexiNote 2-in-1", "A versatile touchscreen laptop that switches from workhorse to tablet in seconds.", 64999, 71999, "", "photo-1525547719571-a2d4ac8945e2", ["14-inch Touchscreen", "16GB RAM + 512GB SSD", "360-degree Hinge", "Stylus Support"], 4.7, 318, false],
  [8, "laptops", "GameCore Ryzen 7", "High-refresh gaming performance with advanced cooling and immersive graphics.", 89999, 99999, "", "photo-1603302576837-37561b2e2302", ["15.6-inch 144Hz Display", "16GB RAM + 1TB SSD", "RTX Graphics", "Advanced Cooling"], 4.8, 276, false],
  [9, "audio", "Pulse ANC Headphones", "Immersive wireless audio with adaptive noise cancellation and rich, balanced sound.", 8999, 10999, "Top Rated", "photo-1505740420928-5e560c06d30e", ["Adaptive Noise Cancellation", "40-hour Battery", "Multipoint Bluetooth", "Fast Charging"], 4.8, 1240, true],
  [10, "audio", "EchoBuds Pro", "True wireless earbuds with spatial audio, clear calls, and a pocket charging case.", 6999, 8999, "", "photo-1606220945770-b5b6c2c55bf1", ["Spatial Audio", "Active Noise Cancellation", "Wireless Charging", "IPX4 Water Resistant"], 4.7, 872, false],
  [11, "audio", "StudioMic USB", "Plug-and-play condenser microphone for streams, calls, and crystal-clear recordings.", 5499, 6999, "", "photo-1590602847861-f357a9332bbc", ["Cardioid Pickup", "USB-C Connection", "Zero-latency Monitoring", "Desk Stand Included"], 4.6, 214, false],
  [12, "audio", "BassBox Go Speaker", "Portable waterproof speaker with deep bass and a full-day listening battery.", 3999, 4999, "", "photo-1608043152269-423dbba4e7e1", ["IPX7 Waterproof", "24-hour Battery", "Stereo Pairing", "Deep Bass"], 4.7, 531, false],
  [13, "wearables", "Orbit Pro Smartwatch", "Track health, calls, and daily goals from a bright always-on display.", 12999, 15999, "New", "photo-1523275335684-37898b6baf30", ["AMOLED Always-on Display", "Heart-rate Monitoring", "GPS Tracking", "7-day Battery"], 4.8, 688, true],
  [14, "wearables", "FitTrack Active Band", "Lightweight fitness tracking with sleep insights and week-long battery life.", 2999, 3999, "", "photo-1557935728-e6d1eaabe558", ["Sleep Tracking", "Step and Activity Tracking", "7-day Battery", "Water Resistant"], 4.5, 344, false],
  [15, "wearables", "Vision AR Glasses", "Stay connected with hands-free notifications and an immersive smart display.", 24999, 29999, "", "photo-1511499767150-a48a237f0083", ["Hands-free Notifications", "HD Camera", "Voice Assistant", "All-day Comfort"], 4.4, 92, false],
  [16, "wearables", "SyncRing Health Tracker", "Discreet sleep, recovery, and wellness insights in a premium titanium ring.", 17999, 21999, "", "photo-1605100804763-247f67b3557e", ["Sleep and Recovery Insights", "Titanium Build", "7-day Battery", "Water Resistant"], 4.6, 128, false]
];

export async function seedCatalog() {
  await Category.bulkWrite(categories.map(category => ({
    updateOne: {
      filter: { slug: category.slug },
      update: { $setOnInsert: category },
      upsert: true
    }
  })));
  await Product.bulkWrite(products.map(([productCode, category, name, description, price, originalPrice, badge, imageId, features, rating, reviews, isFeatured]) => ({
    updateOne: {
      filter: { productCode },
      update: {
        $setOnInsert: {
          productCode,
          category,
          name,
          description,
          price,
          originalPrice,
          badge,
          images: [image(imageId, 1000)],
          features,
          rating,
          reviews,
          stock: 25,
          isFeatured
        }
      },
      upsert: true
    }
  })));
}
