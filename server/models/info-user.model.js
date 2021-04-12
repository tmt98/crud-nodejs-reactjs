const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const User = require("./user.model");
const Info = sequelize.define(
  "Info",
  {
    _id_user: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "_id",
      },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.BOOLEAN, allowNull: false },
    birthday: { type: DataTypes.DATE, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);
Info.belongsTo(User, { foreignKey: "_id_user" });
module.exports = Info;
