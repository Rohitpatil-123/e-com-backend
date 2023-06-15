import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
import bcrypt from "bcryptjs";
// import { sendemail } from "../middlewares/sendemail.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendemail } from "../middlewares/sendemail.js";

export const registeruser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await user.findOne({ email });
  if (data) {
    return res.status(200).json({
      success: false,
      message: "user already exists",
    });
  } else {
    const hashedpassword = await bcrypt.hash(password, 10);

    const data = await user.create({ name, email, password: hashedpassword });

    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECREAT);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    };

    if (process.env.NODE_ENV == "development") {
      options = {};
    }

    res.status(201).cookie("token", token, options).json({
      success: true,
      message: "registered succesfully",
    });
  }
};

export const getallusers = async (req, res) => {
  const re = await user.find({});
  res.send({ success: true, re });
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
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    };
    return res.status(200).cookie("token", token, options).json({
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
  return res.status(200).json({
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

export const forgotpass = async (req, res) => {
  try {
    const data = await user.findOne({ email: req.body.email });
    if (!data) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const resettoken = crypto.randomBytes(20).toString("hex");
    data.resetpasswordtoken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");

    data.resetpasswordexpire = Date.now() + 10 * 60 * 1000;
    await data.save();

    const reseturl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resettoken}`;

    await sendemail({
      email: data.email,
      message: reseturl,
      subject: "click on the link to reset password",
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${data.email}`,
    });
    // let transporter = await nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: "elda.aufderhar@ethereal.email",
    //     pass: "gXNbTvGUQa9gjbVZ3F",
    //   },
    // });

    // await transporter.sendMail({
    //   from: '"rohit patil" <rohitpatil8794@gmail.com>', // sender address
    //   to: data.email, // list of receivers
    //   subject: reseturl, // Subject line
    //   text: "click on the link to reset password", // plain text body
    // });

    // console.log(data.email);
    // // const resetpasswordtoken = user.getResettokenPassword();
    // const resettoken = crypto.randomBytes(20).toString("hex");
    // console.log(resettoken);
    // data.resetpasswordtoken = crypto
    //   .createHash("sha256")
    //   .update(resettoken)
    //   .digest("hex");
    // data.resetpasswordexpire = Date.now() + 10 * 60 * 1000;
    // await data.save();

    // const reseturl = `${req.protocol}://${req.get(
    //   "host"
    // )}/password/reset/${resettoken}`;

    // const message = "reset your password";
    // console.log(message);
    // try {
    //   // await sendemail({
    //   //   email: data.email,
    //   //   subject: "reset password",
    //   //   message,
    //   // });

    //   var transport = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "b6676495f77c8e",
    //       pass: "3d68fce8632d7c",
    //     },
    //   });

    //   const mailoptions = {
    //     from: "rohitpatil8794@gmail.com",
    //     to: data.email,
    //     subject: reseturl,
    //     text: message,
    //   };
    //   await transport.sendMail(mailoptions);

    //   res.status(200).json({
    //     success: true,
    //     message: `Email sent to ${data.email}`,
    //   });
    // } catch (error) {
    //   user.resetpasswordtoken = undefined;
    //   user.resetpasswordexpire = undefined;
    //   await data.save();
    // }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const ckf = (req, res) => {
  res.status(200).cookie("token", "rohit").json({
    success: true,
    message: "cookie sent",
  });
};
