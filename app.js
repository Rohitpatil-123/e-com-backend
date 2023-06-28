import express from "express";
import userRouter from "./routes/user.js";
import categoryRouter from "./routes/category.js";
import productrouter from "./routes/product.js";
import orderrouter from "./routes/order.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
export const app = express();
// mongodb+srv://pass:pass@e-com.unyla29.mongodb.net/?retryWrites=true
config({
  path: "./data/config.env",
});
// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://rcom.onrender.com/"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use(userRouter);
app.use(categoryRouter);
app.use(productrouter);
app.use(orderrouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});
