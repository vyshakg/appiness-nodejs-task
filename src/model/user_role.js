import mongoose from "mongoose";

/**
 * @swagger
 * definitions:
 *  UserRole:
 *    type: Object
 *    properties:
 *      role:
 *        type: string
 */
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
