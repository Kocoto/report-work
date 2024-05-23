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

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(templatePath);
      const report = await ReportModel.find({ date: date }).sort({ msnv: 1 });
      const worksheet = workbook.getWorksheet(1);
      worksheet.getCell("A2").value = note;
      let rowIndex = 5;
      await NoteModel.findByIdAndUpdate("664ab7fdb100b9b6e140b991", {
        note,
      });

      // Tạo báo cáo trống cho người chưa báo cáo
      const users = await UserModel.find({ role: "user" });
      for (const user of users) {
        const reportExists = await ReportModel.findOne({
          date: date,
          idUser: user._id,
        });
        if (!reportExists) {
          try {
            await ReportModel.create({
              date: date,
              today: "",
              tomorrow: "",
              name: user.name,
              idUser: user._id,
              msnv: user.msnv,
            });
          } catch (error) {
            console.error(error);
            res.status(500).send({
              error,
              message: "Lỗi server khi tạo báo cáo mới",
            });
            return;
          }
        }
      }

      // Thiết lập danh sách những người cần báo cáo
      report.forEach((report) => {
        const row = worksheet.getRow(rowIndex);
        row.height = undefined;
        // Đặt giá trị
        worksheet.getCell(`A${rowIndex}`).value = report.msnv;
        worksheet.getCell(`B${rowIndex}`).value = report.name;
        worksheet.getCell(`C${rowIndex}`).value = report.today;
        worksheet.getCell(`D${rowIndex}`).value = report.tomorrow;

        // Xuống dòng
        row.getCell("A").alignment = { wrapText: true };
        row.getCell("B").alignment = { wrapText: true };
        row.getCell("C").alignment = { wrapText: true };
        row.getCell("D").alignment = { wrapText: true };

        // Thiết lập viền
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

        // Căn chỉnh văn bản
        worksheet.getCell(`A${rowIndex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        worksheet.getCell(`B${rowIndex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        worksheet.getCell(`C${rowIndex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        worksheet.getCell(`D${rowIndex}`).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };

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

  async updateNote(req, res) {
    try {
      const { note } = req.body;
      const updatedNote = await NoteModel.findByIdAndUpdate(
        "664ab7fdb100b9b6e140b991",
        {
          note,
        }
      );
      res
        .status(200)
        .send({ updatedNote, message: "Cập nhật note thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Lỗi khi cập nhật note" });
    }
  }

  async export(req, res) {
    try {
      const note = await NoteModel.findById("664ab7fdb100b9b6e140b991");
      const date = req.query.date
        ? req.query.date
        : new Date().toLocaleDateString("en-GB");
      const report = await ReportModel.find({ date: date });
      res.status(200).send({ report, note });
    } catch (error) {
      res.status(500).send("Lỗi server khi tìm kiếm report");
    }
  }
}
module.exports = new ExportController();
