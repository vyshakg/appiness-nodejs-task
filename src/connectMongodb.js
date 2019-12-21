import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}

const MONGO_URL =
  process.env.NODE_ENV === "production"
    ? `mongodb://${process.env.MONGODB_USER}:${encodeURIComponent(
        process.env.MONGODB_PASSWORD
      )}@ds357708.mlab.com:57708/aua`
    : "mongodb://localhost:27017/aua";
const createDatabaseConn = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DataBase");
  } catch (e) {
    throw new Error("Coundn't connect to Database");
  }
};

export default createDatabaseConn;
