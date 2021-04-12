const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./user.model");
const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    _id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "_id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Comfirm",
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Order.belongsTo(User, { foreignKey: "_id" });
module.exports = Order;
