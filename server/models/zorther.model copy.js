const mongoose = require("mongoose");
const { Schema } = mongoose;
const ortherSchema = new Schema(
  {
    _id_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    datecreate: { type: Date, default: Date.now },
    status: Boolean,
  },
  { timestamps: true }
);
const Orther = mongoose.model("Orther", ortherSchema, "orther");
module.exports = Orther;
