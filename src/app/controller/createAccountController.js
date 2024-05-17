const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

class CreateAccountController {
  async create(req, res) {
    const { password, username, role } = req.body;
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      await UserModel.create({
        password: hashPassword,
        username: username,
        role: role,
      });
      console.log(hashPassword);
      res.send("đã tạo người dùng mới thành công");
    } catch (error) {
      res.send("đã xảy ra lỗi khi tạo người dùng mới ");
    }
  }
}

module.exports = new CreateAccountController();
