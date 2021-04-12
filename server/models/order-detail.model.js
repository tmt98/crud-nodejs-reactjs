const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const Product = require("./product.model");
const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: "product_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: { min: 1 },
    },
    current_sellprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current_buyprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);
OrderDetail.belongsTo(Product, { foreignKey: "product_id" });
module.exports = OrderDetail;
