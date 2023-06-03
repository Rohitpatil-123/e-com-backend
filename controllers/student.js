import { student } from "../models/student.js";
export const registerstudents = async (req, res) => {
  const { Rollno, name, classd, grade } = req.body;
  const data = await student.create({ Rollno, name, classd, grade });
  if (data) {
    res.json({
      success: true,
      message: "registered succesfully",
    });
  }
};

export const getallstudents = async (req, res) => {
  const data = await student.find({});
  res.json({
    success: true,
    data,
  });
};
