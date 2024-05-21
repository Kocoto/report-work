const ReportModel = require("../models/report");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
class ReportController {
  async report(req, res, next) {
    try {
      const idUser = req.body.idUser;
      const user = await UserModel.findById(idUser);
      const { date, today, tomorrow } = req.body;

      const report = await ReportModel.create({
        date: date,
        today: today,
        tomorrow: tomorrow,
        name: user.name,
        idUser: idUser,
      });
      res.status(200).json({ report });
    } catch (error) {
      res.status(500).send({ message: "lỗi sever", error });
    }
  }

  async getReport(req, res) {
    try {
      const idUser = req.query.idUser;
      const date = req.query.date
        ? req.query.date
        : new Date().toLocaleDateString("en-GB");
      const user = await ReportModel.findOne({ date: date, idUser: idUser });
      console.log(user);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "lỗi sever" });
    }
  }
}

module.exports = new ReportController();
