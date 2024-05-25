const jwt = require("jsonwebtoken");
const UserModel = require("../app/models/user");

// Kiểm tra đăng nhập
function checkLogin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại" });
    }

    jwt.verify(token, "PW", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
      }
      UserModel.findById(decoded._id)
        .then((user) => {
          if (user) {
            if (user.status === "inactive") {
              return res
                .status(403)
                .json({ message: "Tài khoản của bạn đã bị vô hiệu hóa" });
            }
            req.user = user;
            console.log("Xác thực người dùng thành công: " + req.user);
            next();
          } else {
            return res.status(401).send("Vui lòng đăng nhập lại");
          }
        })
        .catch((err) => {
          return res.status(500).send("Lỗi khi truy vấn người dùng");
        });
    });
  } catch (err) {
    return res.status(500).send("Lỗi xử lý token");
  }
}

// Kiểm tra quyền admin
function checkAdmin(req, res, next) {
  try {
    const role = req.user.role;
    if (role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
  } catch (error) {
    return res.status(500).send("Đã xảy ra lỗi: " + error.message);
  }
}
module.exports = { checkLogin, checkAdmin };
