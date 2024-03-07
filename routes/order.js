import express from "express";
import {
  deleteorder,
  getorders,
  getuserorders,
  placeorder,
  saveorder,
} from "../controllers/order.js";
import { isauth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/placeorder", isauth, placeorder);

router.get("/orders", getorders);

router.get("/deleteorder/:id", deleteorder);

router.get("/orderpay/", isauth, saveorder);

router.get("/getuserorders/:id", isauth, getuserorders);

export default router;
