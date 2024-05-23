const ReportModel = require("../models/report");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
class ReportController {
  async report(req, res, next) {
    try {
      const idUser = req.body.idUser;
      const { date, today, tomorrow } = req.body;
      const user = await UserModel.findById(idUser);
      const checkReport = await ReportModel.findOne({ date, idUser });
      if (checkReport) {
        const editReport = await ReportModel.findOneAndUpdate(
          { date, idUser },
          { today, tomorrow }
        );
        return res
          .status(200)
          .send({ message: "Báo cáo đã được chỉnh sửa", editReport });
      }
      const report = await ReportModel.create({
        date: date,
        today: today,
        tomorrow: tomorrow,
        name: user.name,
        idUser: idUser,
        msnv: user.msnv,
      });
      res.status(200).send({ message: "Báo cáo đã được lưu", report });
    } catch (error) {
      res.status(500).send({ message: "lỗi sever", error });
    }
  }

  async editReport(req, res) {
    try {
      const idUser = req.body.idUser;
      const { date, today, tomorrow } = req.body;
      const user = await UserModel.findById(idUser);
      const checkReport = await ReportModel.findOne({ date, idUser });
      if (!checkReport) {
        const createReport = await ReportModel.create({
          date,
          idUser,
          today,
          tomorrow,
          name: user.name,
          msnv: user.msnv,
        });
        return res
          .status(200)
          .send({ message: "Báo cáo đã được lưu", createReport });
      }
      const report = await ReportModel.findOneAndUpdate(
        {
          date: date,
          idUser: idUser,
        },
        {
          today: today,
          tomorrow: tomorrow,
        }
      );
      return res.status(200).send({ message: "Báo cáo đã được lưu", report });
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
      const report = await ReportModel.findOne({ date: date, idUser: idUser });
      console.log(date);
      console.log(report);
      res.status(200).send(report);
    } catch (error) {
      res.status(500).send({ message: "lỗi sever" });
    }
  }
}

module.exports = new ReportController();
