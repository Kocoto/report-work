const express = require("express");
const router = express.Router();
const reportController = require("../app/controller/reportController");

router.put("/edit", reportController.editReport);
router.post("/input", reportController.report);
router.get("/", reportController.getReport);

module.exports = router;
