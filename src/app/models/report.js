const mongoose = require("mongoose");

const Report = new mongoose.Schema(
  {
    date: String,
    today: String,
    tomorrow: String,
    name: String,
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReportModel = mongoose.model("report", Report);
module.exports = ReportModel;
