const express = require("express");
const jwt = require("jsonwebtoken");

const controller = require("../controllers/category.controller");
const router = express.Router();
router.get("/", controller.getAllCategory);
router.post("/", controller.addCategory);
router.put("/:id", controller.editCategory);
module.exports = router;
