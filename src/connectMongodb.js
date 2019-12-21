import mongoose from "mongoose";

const MONGOURL = process.env.MONGOURL || "mongodb://localhost:27017/aua";

export default async () => {
  try {
    await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (e) {
    console.log("Couldn't connect with Database", e);
  }
};
