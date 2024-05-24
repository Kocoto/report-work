const cloudinary = require("cloudinary").v2;

// Kiểm tra các thông số cấu hình trước khi thiết lập
if (!"dkofqxive" || !"377965399128162" || !"rk9MsQBF1itZ-WlWQ0updpJwvXs") {
  console.error("Thiếu thông tin cấu hình Cloudinary.");
} else {
  cloudinary.config({
    cloud_name: "dkofqxive",
    api_key: "377965399128162",
    api_secret: "rk9MsQBF1itZ-WlWQ0updpJwvXs",
    secure: true,
  });
}
