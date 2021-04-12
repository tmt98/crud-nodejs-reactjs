const express = require("express");

const controller = require("../controllers/nhanvien.controller");
const router = express.Router();
router.get("/", controller.nhanvien); // GET ALL NHAN VIEN
router.post("/add", controller.addNhanVien);
module.exports = router;
