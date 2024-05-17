const homeRouter = require("./home");
const createAccountRouter = require("./createAccount");
const loginController = require("./login");
const reportController = require("./report");
const exportController = require("./export");
const { checkLogin, checkAdmin } = require("../ulti/authorize");

function route(app) {
  app.use("/create", checkLogin, checkAdmin, createAccountRouter);
  app.use("/export", exportController);
  app.use("/report", checkLogin, reportController);
  app.use("/login", loginController);
  app.use("/", homeRouter);
}

module.exports = route;
