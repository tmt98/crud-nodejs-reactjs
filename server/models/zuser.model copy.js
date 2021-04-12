const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    level: Number,
  },
  { timestamps: true }
);
userSchema.methods.comparePassword = function (password) {
  console.log("Password in compare: " + password + ":" + this.password);
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.toJson = () => {
  return {
    _id: this._id,
    username: this.username,
    password: this.password,
    level: this.level,
    createAt: this.createAt,
    updateAt: this.updateAt,
  };
};
const User = mongoose.model("User", userSchema, "user");
module.exports = User;
