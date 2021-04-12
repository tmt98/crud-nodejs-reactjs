const express = require("express");
const jwt = require("jsonwebtoken");

const controller = require("../controllers/product.controller");
const router = express.Router();
router.get("/", controller.getAllProduct);
router.get("/search/:name", controller.searchByName);
router.get("/category/:category", controller.getProductByCategory);
router.get("/:id", controller.getProductById);
router.post("/", controller.uploadProductImage, controller.addProduct);
router.put("/:id", controller.uploadProductImage, controller.editProduct);
router.put("/add_stock/:id", controller.addStock);
module.exports = router;
