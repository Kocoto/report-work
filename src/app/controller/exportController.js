const ReportModel = require("../models/report");
const ExcelJS = require("exceljs");
const NoteModel = require("../models/note");
const { now } = require("mongoose");
class ExportController {
  async download(req, res, next) {
    const { date, note } = req.body;
    try {
      const avc = await NoteModel.findOneAndUpdate({ note });
      console.log(avc);
      const report = await ReportModel.find({ date });
      if (report && report.length > 0) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Report");
        worksheet.columns = [
          { header: "Nhân viên", key: "date", width: 30 },
          { header: "Công việc hôm nay", key: "today", width: 50 },
          { header: "Công việc ngày mai", key: "tomorrow", width: 50 },
        ];
        console.log(report);
        worksheet.addRows(report);
        // workbook.xlsx.writeFile("data.xlsx");
        workbook.xlsx.writeBuffer().then((buffer) => {
          // Gửi buffer về phía client
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=report.xlsx"
          );
          res.send(buffer);
        });
      } else {
        res
          .status(404)
          .send({ message: "hiện tại không có báo được cập nhật" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Lỗi khi tạo báo cáo Excel" });
    }
  }

  export(req, res) {
    const date = req.query.date ? req.query.date : new Date();
  }
}

module.exports = new ExportController();
