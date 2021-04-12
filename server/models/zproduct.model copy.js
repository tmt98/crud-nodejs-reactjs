const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    _id_category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    productname: String,
    description: String,
    buyprice: Number,
    sellprice: Number,
    image: String,
    point: Number,
  },
  { timestamps: true }
);
module.exports = Product;
