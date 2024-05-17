const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
    status: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.model("user", userSchema);
module.exports = UserSchema;
