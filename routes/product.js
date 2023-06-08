import express from "express";
import {
  addcart,
  addproduct,
  deletecart,
  getcart,
  getpertiprod,
  getproduct,
} from "../controllers/Product.js";
import { isauth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/addproduct", addproduct);

router.get("/getallproduct", getproduct);

router.get("/product/:id", getpertiprod);

router.get("/addcart/:id", isauth, addcart);

router.get("/cartelem", isauth, getcart);

router.get("/cartremove/:id", isauth, deletecart);

export default router;
