import { hash } from "bcryptjs";
import express from "express";
import User from "../model/user";
import UserRole from "../model/user_role";

const userRoute = express.Router();

/**
 * @author : "vyshak G"
 * @returns : status which is SUCCESS/FAILURE  | message : "revelavent message w.r.t status"
 *
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - email
 *           - password
 *     responses:
 *       '201':
 *         description: User created
 *       '400':
 *         description: Username or email already taken
 *       '500':
 *         description: Internal server error
 */
userRoute.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let role = "ROLE_USER";

    // checking whether user exist with same  email.
    const user = await User.findOne({ email });

    // if doest user exists.
    if (!user) {
      // checking whether you have role admin in the role database
      const adminCount = await UserRole.find({ role: "ROLE_ADMIN" }).count();

      // if no role is present
      if (adminCount === 0) role = "ROLE_ADMIN";

      const hashPassword = await hash(password, 10);

      const userRole = new UserRole({
        role
      });
      // saving user role
      const userRoleSaved = await userRole.save();

      const registerUser = new User({
        username,
        email,
        password: hashPassword,
        user_role: userRoleSaved._id
      });

      //   saving user
      const _user = await registerUser.save();

      return res.status(201).json({
        status: "SUCCESS",
        message: `${_user.username} is register as ${role}`
      });
    }
    return res.status(400).json({
      status: "FAILURE",
      message: `${email} is already taken`
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "FAILURE", message: "!Oops...Something went wrong" });
  }
});

/**
 * @swagger
 * /api/reset:
 *  post:
 *    tags:
 *      - Reset
 *    name: Reset
 *    summary: Reset Database - for testing purpose only
 *    description: To reset the database
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      '201':
 *        description: A successfully deleted
 *      '500':
 *        description: Internal server error
 */

userRoute.post("/api/reset", async (req, res) => {
  try {
    await User.deleteMany({});
    await UserRole.deleteMany({});

    return res.status(201).json({ status: "SUCCESS", message: "deleted" });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "FAILURE", message: "!Oops...Something went wrong" });
  }
});

export default userRoute;
