const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        return res.status(204).json("Không tìm thấy người dùng");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json("Mật khẩu không chính xác");
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "PW"
      );

      res.cookie("tokenLogin", token, {
        expires: new Date(Date.now() + 18000000000),
      });
      console.log(token);
      res.status(200).send({
        status: 200,
        message: "Đăng nhập thành công",
        token: token,
        data: user,
      });
    } catch (err) {
      res.status(500).json("Lỗi server");
    }
  }
}

module.exports = new LoginController();
