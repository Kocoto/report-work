const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const storage = multer.memoryStorage(); // Lưu trữ tạm thời ảnh trong bộ nhớ
const upload = multer({ storage: storage });

// Cấu hình Cloudinary đã được chuyển sang file config riêng
const uploadToCloudinary = upload.single("avatar");

const cloudinaryMiddleware = (req, res, next) => {
  uploadToCloudinary(req, res, function (error) {
    if (error) {
      return res.status(500).json({ error: "Lỗi trong quá trình tải file." });
    }
    if (!req.file) {
      return next();
    }

    // Tải ảnh lên Cloudinary
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Lỗi khi tải ảnh lên Cloudinary." });
        }
        req.cloudinaryUrl = result.url; // Lưu URL của ảnh vào req để sử dụng ở các middleware tiếp theo
        next();
      })
      .end(req.file.buffer);
  });
};

module.exports = cloudinaryMiddleware;
