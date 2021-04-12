const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const Product = require("./product.model");
const Storage = sequelize.define(
  "Storage",
  {
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: "product_id",
      },
      primaryKey: true,
      unique: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
  },
  { timestamps: true }
);
// Storage.belongsTo(Product, { foreignKey: "product_id" });
module.exports = Storage;
