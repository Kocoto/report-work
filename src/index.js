const express = require("express");
const app = express();
const port = process.env.PORT || 10000;
const route = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const db = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./ulti/swagger.json");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

//connect DB
db.connect();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

const store = new MongoDBStore({
  uri: "mongodb+srv://reportwork:TvDip.J_ma_7wax@cluster0.grshbqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  collection: "sessions",
});

store.on("error", function (error) {
  console.log("MongoDBStore error:", error);
});

//use express-session
app.use(
  session({
    store: store,
    secret: "pw",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Thời gian sống 1 ngày (86400000 miliseconds)
    },
  })
);

app.use(cors());

//route innit
route(app);
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
