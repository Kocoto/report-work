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
    name: String,
    msnv: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", User);
module.exports = UserModel;
