import { categoryi } from "../models/category.js";

export const addcategory = async (req, res) => {
  const { category } = req.body;
  const dat = await categoryi.findOne({ category });
  if (dat) {
    res.status(404).json({
      success: false,
      message: "category already exists",
    });
  } else {
    const data = await categoryi.create({ category });
    if (data) {
      res.status(200).json({
        success: true,
        message: "category added succesfully",
      });
    }
  }
};

export const getcategory = async (req, res) => {
  const data = await categoryi.find({});
  res.status(200).json({
    success: true,
    message: data,
  });
};

export const deletecat = async (req, res) => {
  const { cat } = req.body;
  const dele = await categoryi.findOne({ category: cat });

  if (!dele) {
    res.status(404).json({
      success: false,
      message: "category does not exists",
    });
  } else {
    await categoryi.deleteOne({ category: cat });
    res.status(200).json({
      success: true,
      message: "deleted succesfully",
    });
  }
};
