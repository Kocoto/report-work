const homeRouter = require("./home");
const createAccountRouter = require("./createAccount");
const loginRouter = require("./login");
const reportRouter = require("./report");
const exportRouter = require("./export");
const { checkLogin, checkAdmin } = require("../ulti/authorize");

function route(app) {
  app.use("/create", checkLogin, checkAdmin, createAccountRouter);
  app.use("/export", exportRouter);
  app.use("/report", checkLogin, reportRouter);
  app.use("/login", loginRouter);
  app.use("/", homeRouter);
}

module.exports = route;
