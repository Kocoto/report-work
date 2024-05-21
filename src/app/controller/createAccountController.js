const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

class CreateAccountController {
  async create(req, res) {
    const { name, msnv, password, username, role } = req.body;
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
        name,
        msnv,
      });
      console.log(hashPassword);
      res.status(201).send("đã tạo người dùng mới thành công");
    } catch (error) {
      res.status(500).send("đã xảy ra lỗi khi tạo người dùng mới ");
    }
  }
  async edit(req, res) {
    const { role, name, username, password, status } = req.body;
    const idUser = req.body.id;
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
        console.log(user);
        res
          .status(200)
          .send({ user, message: "Cập nhật người dùng thành công" });
      } else {
        const user = await UserModel.findByIdAndUpdate(idUser, {
          role,
          name,
          username,
          status,
        });
        res
          .status(200)
          .send({ user, message: "Cập nhật người dùng thành công" });
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
  async detail(req, res) {
    try {
      const idUser = req.query.idUser;
      console.log(idUser);
      const detailUser = await UserModel.findById(idUser);
      console.log(detailUser);
      res.status(200).send(detailUser);
    } catch (error) {
      res.status(500).send({ message: "lỗi sever" });
    }
  }
}

module.exports = new CreateAccountController();
