const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const db = require("./config/db");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// // method
// app.use(methodOverride("_method"));

// HTTP logger
app.use(morgan("combined"));

// use middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//use cookie parser
app.use(cookieParser());

//use express-session
app.use(
  session({
    secret: "pw",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Thời gian sống 1 ngày (86400000 miliseconds)
    },
  })
);

//connect DB
db.connect();

//route innit
route(app);
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
