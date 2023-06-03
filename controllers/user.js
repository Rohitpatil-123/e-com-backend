import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
import bcrypt from "bcryptjs";

export const registeruser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await user.findOne({ email });
  if (data) {
    return res.status(404).json({
      success: false,
      message: "user already exists",
    });
  } else {
    const hashedpassword = await bcrypt.hash(password, 10);

    const data = await user.create({ name, email, password: hashedpassword });

    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECREAT);
    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .json({
        success: true,
        message: "registered succesfully",
      });
  }
};

export const getallusers = async (req, res) => {
  const re = await user.find({});
  res.send({ success: true, re });
};

export const setcookies = (req, res) => {
  res.cookie("name", "rohit", { expires: new Date(Date.now() + 60 * 1000) });
  res.send("success");
};

export const loginuser = async (req, res) => {
  const { email, password } = req.body;
  const data = await user.findOne({ email });

  if (!data) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const ismatch = await bcrypt.compare(password, data.password);

  if (ismatch) {
    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECREAT);
    return res.status(200).cookie("token", token).json({
      success: true,
      message: "Logged in successfully",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "invalid username & Password",
    });
  }
};

export const getusers = (req, res) => {
  res.status(200).json({
    success: true,
    data: req.data,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { maxAge: new Date(Date.now()) })
    .json({ success: true });
};
