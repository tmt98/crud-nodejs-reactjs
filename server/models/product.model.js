const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const Category = require("./category.model");
const Storage = require("./storage.model");
const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    productname: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    category_id: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "category_id",
      },
    },
    trademark: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "None",
    },
    buyprice: { type: DataTypes.DOUBLE, allowNull: false },
    sellprice: { type: DataTypes.DOUBLE, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    point: { type: DataTypes.FLOAT, allowNull: false },
  },
  { timestamps: true }
);
Product.belongsTo(Category, { foreignKey: "category_id" });
Product.hasOne(Storage, { foreignKey: "product_id" });
module.exports = Product;
