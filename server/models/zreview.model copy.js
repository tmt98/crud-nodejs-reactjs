const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    _id_product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    _id_user: { type: Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    review: String,
    datereview: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema, "review");
module.exports = Review;
