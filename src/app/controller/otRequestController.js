const OTModel = require("../models/ot");
const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const path = require("path");

class OvertimeRequestController {
  async createOvertimeRequest(req, res) {
    try {
      const { name, department, date, startTime, endTime, reason } = req.body;
      let index = "";
      const indexMax = await OTModel.find({ date })
        .select("index -_id")
        .sort({ index: -1 })
        .limit(1); // Chỉ lấy phần tử đầu tiên

      if (indexMax.length > 0) {
        index = parseInt(indexMax[0].index) + 1; // Chuyển đổi index sang số nguyên và tăng lên 1
      } else {
        index = 1; // Nếu không có yêu cầu OT nào trong ngày, bắt đầu từ 1
      }

      const overtimeRequest = new OTModel({
        index,
        name,
        department,
        date,
        startTime,
        endTime,
        reason,
      });

      await overtimeRequest.save();
      res.status(201).send("Yêu cầu OT đã được lưu trữ");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Đã xảy ra lỗi khi lưu trữ yêu cầu OT");
    }
  }

  async updateOvertimeRequest(req, res) {
    try {
      const { id } = req.params;
      const { name, department, date, startTime, endTime, reason } = req.body;

      const updatedRequest = await OTModel.findByIdAndUpdate(
        id,
        { name, department, date, startTime, endTime, reason },
        { new: true }
      );

      if (!updatedRequest) {
        return res.status(404).send("Không tìm thấy yêu cầu OT");
      }

      res.status(200).send("Yêu cầu OT đã được cập nhật");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Đã xảy ra lỗi khi cập nhật yêu cầu OT");
    }
  }

  async deleteOvertimeRequest(req, res) {
    try {
      const { id } = req.params;

      const deletedRequest = await OTModel.findByIdAndDelete(id);

      if (!deletedRequest) {
        return res.status(404).send("Không tìm thấy yêu cầu OT");
      }

      res.status(200).send("Yêu cầu OT đã được xóa");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Đã xảy ra lỗi khi xóa yêu cầu OT");
    }
  }

  async generateOvertimeReport(req, res) {
    try {
      const today = new Date().getDate().toString().padStart(2, "0");
      const currentDate = new Date();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      console.log(month);
      const year = currentDate.getFullYear();
      console.log(year);
      const { date } = req.query;
      //   const overtimeRequests = await OTModel.find({ date });
      const overtimeRequests = [
        {
          index: 1,
          name: "Nguyen Van A",
          department: "IT",
          startTime: "18:00",
          endTime: "20:00",
          reason: "Hoàn thành dự án",
          signature: "Nguyen Van A",
        },
        {
          index: 2,
          name: "Tran Thi B",
          department: "HR",
          startTime: "18:00",
          endTime: "21:00",
          reason: "Tuyển dụng",
          signature: "Tran Thi B",
        },
        {
          index: 3,
          name: "Le Van C",
          department: "Finance",
          startTime: "19:00",
          endTime: "22:00",
          reason: "Báo cáo tài chính",
          signature: "Le Van C",
        },
      ];

      const templatePath = path.resolve(
        __dirname,
        "../../../overtimeRequest.docx"
      );
      const content = fs.readFileSync(templatePath, "binary");

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({
        today,
        month,
        year,
        date,
        entries: overtimeRequests.map((request, index) => ({
          index: request.index,
          name: request.name,
          department: request.department,
          startTime: request.startTime,
          endTime: request.endTime,
          reason: request.reason,
        })),
      });

      // Render dữ liệu đã điền vào mẫu
      doc.render();
      const buf = doc.getZip().generate({ type: "nodebuffer" });

      const filename = encodeURIComponent("Giấy đề nghị tăng ca.docx");

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
}

module.exports = new OvertimeRequestController();
