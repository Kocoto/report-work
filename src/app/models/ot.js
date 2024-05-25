const mongoose = require("mongoose");

const OvertimeRequestSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
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
