class HomeController {
  home(req, res) {
    const da = new Date();
    console.log(da);
    res.send("testtttttttttttt");
  }
}
module.exports = new HomeController();
