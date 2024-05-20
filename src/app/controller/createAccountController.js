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
  async edit(req, res) {
    const { idUser, role, name, username, password, status } = req.body;
    try {
      if (req.body.password) {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.findByIdAndUpdate(idUser, {
          role,
          name,
          username,
          status,
          password: hashPassword,
        });
        res.status(200).send(user);
      } else {
        const user = await UserModel.findByIdAndUpdate(idUser, {
          role,
          name,
          username,
          status,
        });
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send({ message: "lỗi sever" });
    }
  }
  async user(req, res) {
    try {
      const user = await UserModel.find();
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "lỗi sever" });
    }
  }
}

module.exports = new CreateAccountController();
