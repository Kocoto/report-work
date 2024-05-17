const ReportModel = require("../models/report");
const jwt = require("jsonwebtoken");

class ReportController {
  async report(req, res, next) {
    try {
      const token = req.cookies.tokenLogin;
      console.log(token);
      const idUser = jwt.verify(token, "PW");
      const { date, today, tomorrow } = req.body;

      const report = await ReportModel.create({
        date: date,
        today: today,
        tomorrow: tomorrow,
        userId: idUser,
      });
      res.status(200).json({ report });
    } catch (error) {
      res.status(500).send({ "lỗi sever: ": error });
    }
  }
}

module.exports = new ReportController();
