const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

class CreateAccountController {
  async create(req, res) {
    const { name, password, username, role, position, department, email } =
      req.body;
    try {
      const userExists = await UserModel.findOne({ username: username });
      if (userExists) {
        return res.status(409).json({
          message: "Username đã tồn tại",
        });
      }

      const lastUser = await UserModel.findOne().sort({ msnv: -1 });
      console.log("lastUser", lastUser);
      let newMsnv = "NV0001";
      if (lastUser && lastUser.msnv && lastUser.msnv.startsWith("NV")) {
        console.log("lastUser.msnv", lastUser.msnv);
        const lastNumber = parseInt(lastUser.msnv.substring(2)) + 1;
        newMsnv = `NV${lastNumber.toString().padStart(4, "0")}`;
      }
      console.log("newMsnv", newMsnv);
      const msnv = req.body.msnv || newMsnv;
      const hashPassword = await bcrypt.hash(password, 10);
      const avatarUrl = req.cloudinaryUrl || null;

      await UserModel.create({
        name,
        username,
        password: hashPassword,
        role,
        msnv,
        avatar: avatarUrl,
        email,
        position, // thêm trường chức vụ
        department, // thêm trường bộ phận
      });

      res.status(201).send("đã tạo người dùng mới thành công");
    } catch (error) {
      res.status(500).send("đã xảy ra lỗi khi tạo người dùng mới");
    }
  }

  async edit(req, res) {
    const { role, name, username, password, status, id, position, department } =
      req.body;
    try {
      const updateData = {
        role,
        name,
        username,
        status,
        position, // cập nhật trường chức vụ
        department, // cập nhật trường bộ phận
      };

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.status(200).json({
        user: updatedUser,
        message: "Cập nhật người dùng thành công",
      });
    } catch (error) {
      res.status(500).json({ message: "lỗi sever" });
    }
  }

  async user(req, res) {
    try {
      const users = await UserModel.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: "lỗi sever" });
    }
  }

  async detail(req, res) {
    try {
      const idUser = req.query.idUser;
      const detailUser = await UserModel.findById(idUser);
      res.status(200).send(detailUser);
    } catch (error) {
      res.status(500).send({ message: "lỗi sever" });
    }
  }
}

module.exports = new CreateAccountController();
