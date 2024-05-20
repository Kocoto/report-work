class HomeController {
  home(req, res) {
    const date = req.query.date
      ? req.query.date
      : new Date().toLocaleDateString("en-GB");
    console.log(date);
    res.send("testtttttttttttt");
  }
}
module.exports = new HomeController();
