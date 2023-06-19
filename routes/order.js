import express from "express";
import { getorders, placeorder } from "../controllers/order.js";
import { isauth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/placeorder", isauth, placeorder);

router.get("/orders", getorders);

export default router;
