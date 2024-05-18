const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    date: Date,
    today: String,
    tomorrow: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

const ReportSchema = mongoose.model("report", reportSchema);
module.exports = ReportSchema;
