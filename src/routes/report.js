const express = require("express");
const router = express.Router();
const reportController = require("../app/controller/reportController");

router.post("/", reportController.report);

module.exports = router;
