const express = require("express");
const router = express.Router();
const exportController = require("../app/controller/exportController");

router.post("/", exportController.export);

module.exports = router;
