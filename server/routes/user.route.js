const express = require("express");

const controller = require("../controllers/user.controller");
const router = express.Router();
// Router "get"
router.get("/", controller.getAllUser);
router.get("/sort", controller.sortUser);
router.get("/search/:name", controller.searchUserByName);
router.get("/:id", controller.getUserByID);
// Router "post"
router.post("/add", controller.addUser);
// Router "put"
router.put("/update/:id", controller.updateInfoUser);
// Router "delete"
router.delete("/delete/:id", controller.deleteUser);

module.exports = router;
