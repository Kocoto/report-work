const nodemailer = require("nodemailer");
async function sendEmail(to, subject, htmlContent) {
  const linkReport = "https://ckdcosvietnam.com/erp";
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "duocnn.bluepink@gmail.com",
      pass: "tmzx iihg mvqo tuaj",
    },
  });

  let info = await transporter.sendMail({
    from: "Công Ty TNHH BluePink",
    to: to.join(", "),
    subject: subject,
    html: htmlContent,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
