import express from "express";
import userRouter from "./routes/user.js";
import studentRouter from "./routes/students.js";
import categoryRouter from "./routes/category.js";
import productrouter from "./routes/product.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
export const app = express();

config({
  path: "./data/config.env",
});
// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use(userRouter);
app.use(studentRouter);
app.use(categoryRouter);
app.use(productrouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});
