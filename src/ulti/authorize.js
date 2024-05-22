const jwt = require("jsonwebtoken");
const UserModel = require("../app/models/user");

//check login
function checkLogin(req, res, next) {
  //check
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }
    const tokenWithoutBearer = token.split(" ")[1];

    jwt.verify(tokenWithoutBearer, "PW", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      UserModel.findOne({
        _id: decoded,
      }).then((data) => {
        if (data) {
          req.user = data;
          console.log(
            "đã xác thực thành cônggggggggggggggggggggggggggggggggggg" +
              req.user
          );
          return next();
        } else {
          res.status(401).send("vui lòng đăng nhập");
        }
      });
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
