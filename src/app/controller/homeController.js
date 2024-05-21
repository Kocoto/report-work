const UserModel = require("../models/user");
const ReportModel = require("../models/report");
class HomeController {
  async home(req, res) {
    const id = "664afe0f0c2fb88d4a96b93e";
    const user = await UserModel.findByIdAndUpdate(id);
    const report = await ReportModel.find().populate("idUser", "msnv password");
    console.log(report);
    console.log(user);
    res.send("testtttttttttttt");
  }
}
module.exports = new HomeController();
