/* Start of Selection */
const UserModel = require("../models/user");
const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const path = require("path");
const LeaveRequestModel = require("../models/leaveRequest");
const { sendEmail } = require("../../ulti/sendMail");

class LeaveRequestController {
  async request(req, res) {
    try {
      const id = req.body.idUser;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(204).send("Người dùng không tồn tại");
      }
      const {
        idUser,
        fullname,
        msnv,
        position,
        department,
        startDate,
        endDate,
        reason,
        handoverPerson,
        handoverDepartment,
        applicationDate,
      } = req.body;
      const approver = "Ban Giám đốc và phòng nhân sự công ty BluePink";

      // Lưu thông tin request vào model LeaveRequestModel
      const leaveRequest = new LeaveRequestModel({
        idUser,
        fullname,
        msnv,
        position,
        department,
        approver,
        startDate,
        endDate,
        reason,
        handoverPerson,
        handoverDepartment,
        applicationDate,
      });

      await leaveRequest.save();

      const templatePath = path.resolve(
        __dirname,
        "../../../leaveRequest.docx"
      );
      const content = fs.readFileSync(templatePath, "binary");

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.setData({
        fullname,
        msnv,
        position,
        department,
        approver,
        startDate,
        endDate,
        reason,
        handoverPerson,
        handoverDepartment,
        applicationDate,
      });

      // Render dữ liệu đã điền vào mẫu
      doc.render();
      const buf = doc.getZip().generate({ type: "nodebuffer" });

      const filename = encodeURIComponent("Đơn xin nghỉ phép.docx");

      // Tải file đã điền dữ liệu về phía client
      res.set({
        "Content-Disposition": `attachment; filename*=UTF-8''${filename}`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      res.send(buf);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Đã xảy ra lỗi khi tạo file");
    }
  }

  async getRequest(req, res) {
    try {
      const id = req.query.idUser;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(204).send("Người dùng không tồn tại");
      }
      const { msnv, position, department } = user;
      res.status(200).send({ msnv, position, department });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Đã xảy ra lỗi khi lấy thông tin người dùng");
    }
  }
}

module.exports = new LeaveRequestController();
