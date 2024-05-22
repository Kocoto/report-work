const express = require("express");
const router = express.Router();
const exportController = require("../app/controller/exportController");

router.post("/download", exportController.download);
router.put("/update", exportController.updateNote);
router.get("/", exportController.export);

module.exports = router;
