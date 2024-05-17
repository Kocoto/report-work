const express = require("express");
const router = express.Router();
const swaggerSpec = require("../swagger");
const craeteAccountController = require("../app/controller/createAccountController");

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Tạo người dùng mới
 *     description: Tạo người dùng mới và thêm dữ liệu đó vào database
 *     responses:
 *       201:
 *         description: Tạo người dùng mới thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 */
router.post("/", craeteAccountController.create);

module.exports = router;
