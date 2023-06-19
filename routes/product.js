import express from "express";
import {
  addcart,
  addproduct,
  deleteallocc,
  deletecart,
  deleteproduct,
  getcart,
  getpertiprod,
  getproduct,
  products,
} from "../controllers/Product.js";
import { isauth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/addproduct", addproduct);

router.get("/getallproduct", getproduct);

router.delete("/product/:id", deleteproduct);

router.get("/product/:id", getpertiprod);

router.get("/prodid/:id", products);

router.get("/addcart/:id", isauth, addcart);

router.get("/cartelem", isauth, getcart);

router.get("/cartremove/:id", isauth, deletecart);

router.get("/delete/:id", isauth, deleteallocc);

export default router;
