const express = require("express");
const router = express.Router();
const craeteAccountController = require("../app/controller/createAccountController");

router.post("/", craeteAccountController.create);

module.exports = router;
