const homeRouter = require("./home");
const createAccountRouter = require("./createAccount");
const loginRouter = require("./login");
const reportRouter = require("./report");
const exportRouter = require("./export");
const leaveRequestRouter = require("./leaveRequest");
const otRequestRouter = require("./ot");
const { checkLogin, checkAdmin } = require("../ulti/authorize");

function route(app) {
  app.use("/leave-request", leaveRequestRouter);
  app.use("/overtime-request", otRequestRouter);
  app.use("/user", createAccountRouter);
  app.use("/export", exportRouter);
  app.use("/report", reportRouter);
  app.use("/login", loginRouter);
  app.use("/", homeRouter);
}

module.exports = route;
