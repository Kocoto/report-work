const express = require("express");
const router = express.Router();
const craeteAccountController = require("../app/controller/createAccountController");
const cloudinaryMiddleware = require("../ulti/upload");

router.post("/avatar", cloudinaryMiddleware, craeteAccountController.avatar);
router.post("/create", craeteAccountController.create);
router.get("/detail", craeteAccountController.detail);
router.put("/edit", craeteAccountController.edit);
router.get("/", craeteAccountController.user);

module.exports = router;
