const jwtHelper = require("../helper/jwt.helper");
const OrderModel = require("../models/order.model");
const OrderDetailModel = require("../models/order-detail.model");
const User = require("../models/user.model");
const Info = require("../models/info-user.model");
const Product = require("../models/product.model");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const moment = require("moment");
module.exports.getAllOrder = async (req, res) => {
  const orderFind = await OrderModel.findAll();
  res.status(200).json(orderFind);
};
module.exports.getOrderByUser = async (req, res) => {
  const accessToken = req.header("authorization");
  console.log(accessToken);
  try {
    const decoded = await jwtHelper.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(decoded);
    const id = decoded.data._id;
    const orderFind = await OrderModel.findAll({
      where: {
        _id: id,
      },
    });
    res.status(200).json(orderFind);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
module.exports.getOrderByIDAdmin = async (req, res) => {
  const accessToken = req.header("authorization");
  console.log(accessToken);
  try {
    const accessToken = req.header("authorization");
    const decoded = await jwtHelper.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (decoded.data.level === 1) {
      const id = decoded.data._id;
      console.log(req.params.id);
      const orderFind = await OrderModel.findAll({
        where: {
          _id: req.params.id,
        },
      });
      res.status(200).json(orderFind);
    } else
      return res.status(403).json({
        message: "Forbidden",
      });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
module.exports.filterOrderByDate = async (req, res) => {
  const { date } = req.params;
  const getDate = moment(new Date(date)).format("YYYY-MM-DD");
  console.log(getDate);
  const startD = getDate + " 00:00:00",
    endD = getDate + " 23:59:59";
  const orderFind = await OrderModel.findAll({
    where: {
      createdAt: {
        [Op.between]: [startD, endD],
      },
    },
  });
  res.status(200).json(orderFind);
};
module.exports.getOrderByID = async (req, res) => {
  const { id } = req.params;
  const order = await OrderModel.findByPk(id, {
    include: [{ model: User, required: true }],
  });
  const listOrder = await OrderDetailModel.findAll({
    where: {
      order_id: id,
    },
    include: [
      {
        model: Product,
        required: true,
      },
    ],
  });
  console.log(order._id);
  const user = await Info.findOne({ where: { _id_user: order._id } });
  const object = {
    user: user,
    order: order,
    list: listOrder,
  };
  res.status(200).json(object);
};
module.exports.getOrderListByPage = async (req, res) => {
  console.log("Chua co gi");
};
