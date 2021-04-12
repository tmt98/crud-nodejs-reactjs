const express = require("express");
const jwt = require("jsonwebtoken");

const controller = require("../controllers/auth.controller");
const router = express.Router();
// router.get
router.get("/getUser", controller.getUser);
// router.post("/", controller.authenticate); //
router.post("/register", controller.upload, controller.register);
router.post("/login", controller.login);
router.post("/refresh-token", controller.refreshToken);
router.post("/upload", controller.upload);
module.exports = router;
