import app from "./app.js";
import { db } from "./config/db.js";

await db();

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`GadgetVerse API running at port ${port}`);
});
