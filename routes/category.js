import express from "express";

import { categoryi } from "../models/category.js";
import {
  addcategory,
  deletecat,
  getcategory,
} from "../controllers/category.js";

const router = express.Router();

router.get("/catgeory", addcategory);

router.get("/getcat", getcategory);

router.get("/delcat", deletecat);

export default router;
