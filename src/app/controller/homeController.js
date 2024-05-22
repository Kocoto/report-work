const UserModel = require("../models/user");
const ReportModel = require("../models/report");
class HomeController {
  async home(req, res) {
    res.send("testtttttttttttt");
  }
}
module.exports = new HomeController();
