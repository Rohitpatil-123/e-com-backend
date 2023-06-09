import express from "express";
import {
  addcart,
  addproduct,
  deletecart,
  deleteproduct,
  getcart,
  getpertiprod,
  getproduct,
} from "../controllers/Product.js";
import { isauth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/addproduct", addproduct);

router.get("/getallproduct", getproduct);

router.delete("/product/:id", deleteproduct);

router.get("/product/:id", getpertiprod);

router.get("/addcart/:id", isauth, addcart);

router.get("/cartelem", isauth, getcart);

router.get("/cartremove/:id", isauth, deletecart);

export default router;
