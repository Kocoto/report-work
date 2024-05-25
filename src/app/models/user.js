const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    resigter: {
      type: Boolean,
      default: false,
    },
    name: String,
    msnv: String,
    avatar: String,
    email: String,
    position: String, // trường chức vụ
    department: String, //  trường bộ phận
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", User);
module.exports = UserModel;
