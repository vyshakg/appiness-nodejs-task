import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "ROLE_USER"
    }
  },
  {
    timestamps: true
  }
);

const UserRole = mongoose.model("UserRole", UserRoleSchema);

export default UserRole;
