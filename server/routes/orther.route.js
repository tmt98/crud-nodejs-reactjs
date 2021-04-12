const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const controller = require("../controllers/orther.controller");
router.get("/", controller.getAllOrder);
router.get("/date/:date", controller.filterOrderByDate);
router.get("/list", controller.getOrderByUser);
router.get("/:id", controller.getOrderByID);
router.get("/user/:id", controller.getOrderByIDAdmin);
router.get("/list/:page", controller.getOrderListByPage);
module.exports = router;
