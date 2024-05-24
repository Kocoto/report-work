const UserModel = require("../models/user");
const ReportModel = require("../models/report");
const cron = require("node-cron");
const { sendEmail } = require("../../ulti/sendMail");
const moment = require("moment-timezone");

class HomeController {
  async home(req, res) {
    res.send("testtttttttttttt");
  }

  async scheduleMail() {
    console.log("Đã thiết lập thời gian gửi mail");
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://res.cloudinary.com/dkofqxive/image/upload/v1716521890/a5fxs77fzoisfrgnii7n.png" alt="Company Logo" style="width: 100%;">
          <h2 style="color: #4CAF50;">Thông báo nộp báo cáo hàng ngày</h2>
        </div>
        <p>Kính gửi các nhân viên,</p>
        <p>Nhắc nhở bạn nộp báo cáo hàng ngày của mình. Vui lòng hoàn thành và gửi báo cáo bằng cách nhấn vào nút bên dưới trước 17:30 mỗi ngày.</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://ckdcosvietnam.com/erp" style="background-color: #FFC0CB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Gửi Báo Cáo</a>
        </div>
        <p>Trân trọng,<br/>Công Ty TNHH BluePink</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <div style="font-size: 12px; color: #777;">
          <p>Địa chỉ: 97/7 Phạm Thái Bường, Tân Phong, Q7, HCM</p>
          <p>Điện thoại: 19007327</p>
          <p>Email: bluepink@ckdvietnam.com</p>
        </div>
      </div>
    `;

    const subject = "Nhắc nhở nộp báo cáo hàng ngày";
    const scheduleTime = moment
      .tz("2023-01-01T17:00:00", "Asia/Ho_Chi_Minh")
      .format("m H * * *"); // Lập lịch để chạy vào lúc 17:00 hàng ngày

    cron.schedule(scheduleTime, async () => {
      try {
        const users = await UserModel.find({ role: "user" }).select(
          "email -_id"
        );
        const emails = users.map((user) => user.email).filter((email) => email);
        if (emails.length > 0) {
          await sendEmail(emails, subject, htmlContent);
          console.log("Emails sent successfully to:", emails);
        } else {
          console.log("No valid emails found to send.");
        }
      } catch (err) {
        console.error("Error sending emails:", err);
      }
    });
  }
  async scheduleHolidayMails() {
    console.log("Đã thiết lập ngày gửi mail nghỉ lễ");
    const holidays = [
      {
        date: moment
          .tz("2022-12-31T09:00:00", "Asia/Ho_Chi_Minh")
          .format("m H D M *"),
        name: "Tết Dương lịch",
      }, // 9:00 sáng ngày 31 tháng 12
      {
        date: moment
          .tz("2023-04-29T09:00:00", "Asia/Ho_Chi_Minh")
          .format("m H D M *"),
        name: "Ngày Chiến thắng",
      }, // 9:00 sáng ngày 29 tháng 4
      // Ngày Giỗ Tổ Hùng Vương cần được tính toán dựa trên lịch âm
      {
        date: moment
          .tz("2023-04-30T09:00:00", "Asia/Ho_Chi_Minh")
          .format("m H D M *"),
        name: "Ngày Quốc tế Lao động",
      }, // 9:00 sáng ngày 30 tháng 4
      {
        date: moment
          .tz("2023-09-01T09:00:00", "Asia/Ho_Chi_Minh")
          .format("m H D M *"),
        name: "Ngày Quốc khánh",
      }, // 9:00 sáng ngày 1 tháng 9
      // Thêm một ngày liền kề với Ngày Quốc khánh
    ];

    holidays.forEach((holiday) => {
      cron.schedule(holiday.date, async () => {
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://res.cloudinary.com/dkofqxive/image/upload/v1716521890/a5fxs77fzoisfrgnii7n.png" alt="Company Logo" style="width: 100%;">
              <h2 style="color: #4CAF50;">Thông báo nghỉ lễ ${holiday.name}</h2>
            </div>
            <p>Kính gửi các nhân viên,</p>
            <p>Chúng tôi xin thông báo ngày nghỉ lễ ${holiday.name}.</p>
            <p>Trân trọng,<br/>Công Ty TNHH BluePink</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <div style="font-size: 12px; color: #777;">
              <p>Địa chỉ: 97/7 Phạm Thái Bường, Tân Phong, Q7, HCM</p>
              <p>Điện thoại: 19007327</p>
              <p>Email: bluepink@ckdvietnam.com</p>
            </div>
          </div>
        `;
        const subject = `Thông báo nghỉ lễ ${holiday.name}`;
        try {
          const users = await UserModel.find({ role: "user" }).select(
            "email -_id"
          );
          const emails = users
            .map((user) => user.email)
            .filter((email) => email);
          if (emails.length > 0) {
            await sendEmail(emails, subject, htmlContent);
            console.log(
              `Emails sent successfully for ${holiday.name} to:`,
              emails
            );
          } else {
            console.log("No valid emails found to send.");
          }
        } catch (err) {
          console.error("Error sending emails:", err);
        }
      });
    });
  }
}

module.exports = new HomeController();
