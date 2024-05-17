const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

class CreateAccountController {
  async create(req, res) {
    const { password, username, role } = req.body;
    try {
      const user = await UserModel.findOne({ username: username });
      if (user) {
        return res.status(409).json({
          message: "Username đã tồn tại",
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await UserModel.create({
        password: hashPassword,
        username: username,
        role: role,
      });
      console.log(hashPassword);
      res.status(201).send("đã tạo người dùng mới thành công");
    } catch (error) {
      res.status(500).send("đã xảy ra lỗi khi tạo người dùng mới ");
    }
  }
}

module.exports = new CreateAccountController();
