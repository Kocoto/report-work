const express = require("express");
const router = express.Router();
const LeaveRequestController = require("../app/controller/leaveRequestController");

router.post("/download", LeaveRequestController.request);
router.get("/", LeaveRequestController.getRequest);

module.exports = router;
