const express = require("express");
const router = express.Router();
const craeteAccountController = require("../app/controller/createAccountController");

router.post("/create", craeteAccountController.create);
router.get("/detail", craeteAccountController.detail);
router.put("/edit", craeteAccountController.edit);
router.get("/", craeteAccountController.user);

module.exports = router;
