const express = require("express");
const router = express.Router();
const homeController = require("../app/controller/homeController");

router.get("/", homeController.home);

module.exports = router;
// "start": "nodemon --inspect src/index.js",
