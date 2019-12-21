import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, unique: true },
    password: {
      type: String
    },
    user_role: {
      type: Schema.Types.ObjectId,
      ref: "UserRole"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
