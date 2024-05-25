const express = require("express");
const router = express.Router();
const OTRequestController = require("../app/controller/otRequestController");

router.delete("/delete/:id", OTRequestController.deleteOvertimeRequest);
router.put("/put/:id", OTRequestController.updateOvertimeRequest);
router.post("/post", OTRequestController.createOvertimeRequest);
router.get("/", OTRequestController.generateOvertimeReport);

module.exports = router;
