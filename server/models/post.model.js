const { Datatype, DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const Product = require("./product.model");
const User = require("./user.model");
const Info = require("./info-user.model");
const Post = sequelize.define(
  "Post",
  {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: "product_id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "_id",
      },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);
module.exports = Info;
