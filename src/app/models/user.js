const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.model("user", userSchema);
module.exports = UserSchema;
