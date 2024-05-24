const mongoose = require("mongoose");

const LeaveRequestSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    fullname: {
      type: String,
    },
    msnv: {
      type: String,
    },
    position: {
      type: String,
    },
    department: {
      type: String,
    },
    approver: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    reason: {
      type: String,
    },
    handoverPerson: {
      type: String,
    },
    handoverDepartment: {
      type: String,
    },
    applicationDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const LeaveRequestModel = mongoose.model("LeaveRequest", LeaveRequestSchema);
module.exports = LeaveRequestModel;
