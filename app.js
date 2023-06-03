import express from "express";
import userRouter from "./routes/user.js";
import studentRouter from "./routes/students.js";
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
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use(userRouter);
app.use(studentRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});
