const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  date: Date,
  today: String,
  tomorrow: String,
});

const ReportSchema = mongoose.model("report", reportSchema);
module.exports = ReportSchema;
