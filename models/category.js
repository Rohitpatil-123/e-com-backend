import mongoose from "mongoose";

const categoryschema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

export const categoryi = mongoose.model("category", categoryschema);
