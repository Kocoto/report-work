const express = require("express");
const router = express.Router();
const homeController = require("../app/controller/homeController");
const UserModel = require("../app/models/user");

router.get("/", (req, res) => {
  const user = UserModel.find();
  res.send(user);
});

router.get("/", homeController.home);

module.exports = router;
