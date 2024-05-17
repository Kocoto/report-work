const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    date: Date,
    today: String,
    tomorrow: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReportSchema = mongoose.model("report", reportSchema);
module.exports = ReportSchema;
