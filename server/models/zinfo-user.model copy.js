const mongoose = require("mongoose");
const { Schema } = mongoose;
const infoUserSchema = new Schema(
  {
    _id_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    sex: Boolean,
    birthday: Date,
    address: String,
    email: String,
    phone: String,
    avatar: String,
  },
  { timestamps: true }
);
infoUserSchema.methods.toJson = () => {
  return {
    _id: this._id,
    _id_user: this._id_user,
    name: this.name,
    sex: this.sex,
    birthday: this.birthday,
    address: this.address,
    email: this.email,
    phone: this.phone,
    avatar: this.avatar,
    createAt: this.createAt,
    updateAt: this.updateAt,
  };
};
const InfoUser = mongoose.model("InfoUser", infoUserSchema, "infouser");
module.exports = InfoUser;
