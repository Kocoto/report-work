const ReportModel = require("../models/report");
const ExcelJS = require("exceljs");
const NoteModel = require("../models/note");
const path = require("path");
const UserModel = require("../models/user");

class ExportController {
  async download(req, res, next) {
    const { date, note } = req.body;
    try {
      const templatePath = path.resolve(
        __dirname,
        "../../../daily report.xlsx"
      );
      const countUser = await UserModel.countDocuments({ role: "user" });
      const countReport = await ReportModel.countDocuments({ date: date });
      const nonReport = countUser - countReport;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(templatePath);
      const report = await ReportModel.find({ date: date });
      const worksheet = workbook.getWorksheet(1);
      worksheet.getCell("A2").value = note;
      let rowIndex = 5;
      await NoteModel.findByIdAndUpdate("664ab7fdb100b9b6e140b991", {
        note,
      });

      report.forEach((report) => {
        const row = worksheet.getRow(rowIndex);

        //đặt giá trị
        worksheet.getCell(`A${rowIndex}`).value = report.msnv;
        worksheet.getCell(`B${rowIndex}`).value = report.name;
        worksheet.getCell(`C${rowIndex}`).value = report.today;
        worksheet.getCell(`D${rowIndex}`).value = report.tomorrow;

        // Thêm các hàng cho người không nộp báo cáo và tô màu xám
        for (let i = 0; i < nonReport; i++) {
          const row = worksheet.getRow(rowIndex);

          // Đặt giá trị trống
          worksheet.getCell(`A${rowIndex}`).value = "";
          worksheet.getCell(`B${rowIndex}`).value = "";
          worksheet.getCell(`C${rowIndex}`).value = "";
          worksheet.getCell(`D${rowIndex}`).value = "";

          // Tô màu xám
          row.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFD3D3D3" }, // Màu xám nhạt
            };
          });
        }
        //xuống dòng
        row.getCell("A").alignment = { wrapText: true };
        row.getCell("B").alignment = { wrapText: true };
        row.getCell("C").alignment = { wrapText: true };
        row.getCell("D").alignment = { wrapText: true };

        //thiết lập viền
        const borderStyle = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell(`A${rowIndex}`).border = borderStyle;
        worksheet.getCell(`B${rowIndex}`).border = borderStyle;
        worksheet.getCell(`C${rowIndex}`).border = borderStyle;
        worksheet.getCell(`D${rowIndex}`).border = borderStyle;

        //tính độ dài
        const msnvLength = (report.msnv || "").toString().length;
        const nameLength = (report.name || "").toString().length;
        const todayLength = (report.today || "").toString().length;
        const tomorrowLength = (report.tomorrow || "").toString().length;
        const maxTextLength = Math.max(
          msnvLength,
          nameLength,
          todayLength,
          tomorrowLength
        );
        //thiết lập độ cao
        row.height = Math.ceil(maxTextLength / 20) * 15; // Điều chỉnh hệ số nếu cần
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
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Lỗi khi tạo báo cáo Excel" });
    }
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
