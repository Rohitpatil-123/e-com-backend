import express from "express";
import { deleteorder, getorders, placeorder } from "../controllers/order.js";
import { isauth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/placeorder", isauth, placeorder);

router.get("/orders", getorders);

router.get("/deleteorder/:id", deleteorder);

export default router;
