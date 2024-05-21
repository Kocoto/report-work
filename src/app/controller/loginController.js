const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    const { username, password } = req.body;
    UserModel.findOne({ username: username })
      .then((data) => {
        if (data) {
          var token = jwt.sign(
            {
              _id: data._id,
            },
            "PW"
          );
          bcrypt.compare(password, data.password, function (err, result) {
            if (err) {
              res.status(500).json("lỗi khi so sánh mật khẩu");
            }
            if (result) {
              res.cookie("tokenLogin", token, {
                expires: new Date(Date.now() + 18000000000),
              });
              console.log(token);
              res.status(200).send({
                status: 200,
                message: "Đăng nhập thành công",
                token: token,
                data: data,
              });
            }
          });
        } else {
          res.status(404).json("Không tìm thấy người dùng");
        }
      })
      .catch((err) => {
        res.status(500).json("loi sever");
      });
  }
}

module.exports = new LoginController();
