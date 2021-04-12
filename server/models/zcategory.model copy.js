const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    categoryname: { type: String, unique: true },
    description: String,
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema, "category");
module.exports = Category;
