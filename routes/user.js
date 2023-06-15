import express from "express";
import {
  forgotpass,
  getallusers,
  getusers,
  loginuser,
  logout,
  registeruser,
  ckf,
} from "../controllers/user.js";
import { isauth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registeruser);

router.post("/all", getallusers);

router.post("/login", loginuser);

router.get("/logout", logout);

router.get("/getuser", isauth, getusers);

router.post("/forgot/password", forgotpass);

router.get("/cook", ckf);

export default router;
