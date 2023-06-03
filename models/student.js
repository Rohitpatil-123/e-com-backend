import mongoose from "mongoose";

const studentschema = new mongoose.Schema({
  Rollno: Number,
  name: String,
  classd: String,
  grade: String,
});

export const student = mongoose.model("Student", studentschema);
