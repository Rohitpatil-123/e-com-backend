import express from "express";
import {
  forgotpass,
  getallusers,
  getusers,
  loginuser,
  logout,
  registeruser,
} from "../controllers/user.js";
import { isauth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registeruser);

router.post("/all", getallusers);

router.get("/login", loginuser);

router.get("/logout", logout);

router.get("/getuser", isauth, getusers);

router.post("/forgot/password", isauth, forgotpass);

export default router;
