const express = require("express");
const router = express.Router();
const homeController = require("../app/controller/homeController");

router.get("/unregister-email", homeController.unregisterEmail);
router.get("/resigter-email", homeController.resigterEmail);
router.get("/", homeController.home);

module.exports = router;
