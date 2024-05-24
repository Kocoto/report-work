const express = require("express");
const router = express.Router();
const OTRequestController = require("../app/controller/otRequestController");

router.get("/", OTRequestController.generateOvertimeReport);

module.exports = router;
