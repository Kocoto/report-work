const UserModel = require("../models/user");

class HomeController {
  async home(req, res) {
    const id = "664afe0f0c2fb88d4a96b93e";
    const user = await UserModel.findByIdAndUpdate(id);
    console.log(user);
    res.send("testtttttttttttt");
  }
}
module.exports = new HomeController();
