import mongoose from "mongoose";

export const db = async () => {
try{
   if (!process.env.MONGO_URL) {
     throw new Error("MONGO_URL is not configured");
   }
   await mongoose.connect(process.env.MONGO_URL);
   console.log("connected to db");
}catch(err){
  console.error(`Database connection failed: ${err.message}`);
  throw err;
}
};
