const ReportModel = require("../models/report");

class ReportController {
  report(req, res) {
    const { date, today, tomorrow } = req.body;
    ReportModel.create({});
  }
}
