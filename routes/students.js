import express from "express";
import { student } from "../models/student.js";
import { getallstudents, registerstudents } from "../controllers/student.js";

const router = express.Router();

router.get("/student/register", registerstudents);

router.get("/student/all", getallstudents);

export default router;
