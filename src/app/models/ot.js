const mongoose = require("mongoose");

const OvertimeRequestSchema = new mongoose.Schema(
  {
    name: String,
    department: String,
    date: String,
    startTime: String,
    endTime: String,
    reason: String,
    index: String,
  },
  {
    timestamps: true,
  }
);

const OTModel = mongoose.model("OvertimeRequest", OvertimeRequestSchema);
module.exports = OTModel;
