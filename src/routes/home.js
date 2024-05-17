const express = require("express");
const router = express.Router();
const homeController = require("../app/controller/homeController");

/**
 * @swagger
 * /home:
 *   get:
 *     summary: trang chủ
 *     description: hiển thị thông tin ở trang chủ
 *     responses:
 *       200:
 *         description: Vào trang chủ thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
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
router.get("/", homeController.home);

module.exports = router;
