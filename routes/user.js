import express from "express";
import {
  getallusers,
  getusers,
  loginuser,
  logout,
  registeruser,
  setcookies,
} from "../controllers/user.js";
import { isauth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registeruser);

router.post("/all", getallusers);

router.get("/cook", setcookies);

router.get("/login", loginuser);

router.get("/logout", logout);

router.get("/getuser", isauth, getusers);

export default router;
