const ReportModel = require("../models/report");
const ExcelJS = require("exceljs");
const NoteModel = require("../models/note");
const path = require("path");
class ExportController {
  async download(req, res, next) {
    const { date, note } = req.body;
    // try {
    //   const avc = await NoteModel.findOneAndUpdate({ note });
    //   console.log(avc);
    //   const report = await ReportModel.find({ date });
    //   if (report && report.length > 0) {
    //     const workbook = new ExcelJS.Workbook();
    //     const worksheet = workbook.addWorksheet("Report");
    //     worksheet.columns = [
    //       { header: "Nhân viên", key: "date", width: 30 },
    //       { header: "Công việc hôm nay", key: "today", width: 50 },
    //       { header: "Công việc ngày mai", key: "tomorrow", width: 50 },
    //     ];
    //     console.log(report);
    //     worksheet.addRows(report);
    //     // workbook.xlsx.writeFile("data.xlsx");
    //     workbook.xlsx.writeBuffer().then((buffer) => {
    //       // Gửi buffer về phía client
    //       res.setHeader(
    //         "Content-Type",
    //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //       );
    //       res.setHeader(
    //         "Content-Disposition",
    //         "attachment; filename=report.xlsx"
    //       );
    //       res.send(buffer);
    //     });
    //   } else {
    //     res
    //       .status(404)
    //       .send({ message: "hiện tại không có báo được cập nhật" });
    //   }
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send({ message: "Lỗi khi tạo báo cáo Excel" });
    // }
    try {
      const templatePath = path.resolve(
        __dirname,
        "../../../daily report.xlsx"
      );
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(templatePath);
      const report = await ReportModel.find({ date: date });
      const worksheet = workbook.getWorksheet(1);
      worksheet.getCell("A2").value = note;
      let rowIndex = 5;
      report.forEach((report) => {
        worksheet.getCell(`A${rowIndex}`).value = report.msnv;
        worksheet.getCell(`B${rowIndex}`).value = report.name;
        worksheet.getCell(`C${rowIndex}`).value = report.today;
        worksheet.getCell(`D${rowIndex}`).value = report.tomorrow;
        rowIndex++;
      });
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
    } catch (error) {}
  }

  async export(req, res) {
    try {
      const date = req.query.date
        ? req.query.date
        : new Date().toLocaleDateString("en-GB");
      const report = await ReportModel.find({ date: date });
      res.status(200).send(report);
    } catch (error) {
      res.status(500).send("Lỗi sever khi tìm kiếm report");
    }
  }
}
module.exports = new ExportController();
