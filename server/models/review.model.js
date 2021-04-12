const { Datatypes, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connect");
const Product = require("./product.model");
const User = require("./user.model");
const Review = sequelize.define(
  "Review",
  {
    review_id: {
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
  },
  { timestamps: true }
);
module.exports = Review;
