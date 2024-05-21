const jwt = require("jsonwebtoken");
const UserModel = require("../app/models/user");

//check login
function checkLogin(req, res, next) {
  //check
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.cookies.tokenLogin;
    var idUser = jwt.verify(token, "PW");
    UserModel.findOne({
      _id: idUser,
    }).then((data) => {
      if (data) {
        req.user = data;
        return next();
      } else {
        res.status(401).send("vui lòng đăng nhập");
      }
    });
  } catch (err) {
    res.status(401).send("vui lòng đăng nhập");
  }
}

function checkAdmin(req, res, next) {
  try {
    const role = req.user.role;
    if (role === "admin") {
      next();
    } else {
      return res.status(409).send({ message: "Bạn không đủ quyền truy cập" });
    }
  } catch (error) {
    return res.status(500).send("Đã xảy ra lỗi: " + err);
  }
}
module.exports = { checkLogin, checkAdmin };
