const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    date: String,
    today: String,
    tomorrow: String,
    name: String,
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReportSchema = mongoose.model("report", reportSchema);
module.exports = ReportSchema;
