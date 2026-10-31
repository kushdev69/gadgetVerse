import dotenv from "dotenv";
import { db } from "./config/db.js";
import { seedCatalog } from "./api/seed/catalog.seed.js";

dotenv.config();

async function main() {
  await db();
  await seedCatalog();
  console.log("Catalog data seeded successfully.");
}

main().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
