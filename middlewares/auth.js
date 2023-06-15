import { user } from "../models/user.js";
import jwt from "jsonwebtoken";
export const isauth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(200).json({
      message: "user not found",
    });
  } else {
    const decode = jwt.verify(token, process.env.JWT_SECREAT);

    req.data = await user.findById(decode._id);
  }
  next();
};
