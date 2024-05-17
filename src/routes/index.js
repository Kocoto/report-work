const homeRouter = require("./home");
const createAccountRouter = require("./createAccount");
const loginController = require("./login");

function route(app) {
  app.use("/create", createAccountRouter);
  app.use("/login", loginController);
  app.use("/", homeRouter);
}

module.exports = route;
