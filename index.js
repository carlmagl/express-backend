const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const auth = require("./helpers/jwt.js");
const { unless } = require("express-unless");
const users = require("./controllers/UserController.js");
const errors = require("./helpers/ErrorHandler.js");

const port = process.env.PORT || 5000;
const config = require("./config");

const postsRouter = require("./routes/posts");
const eventsRouter = require("./routes/events");
const userRouter = require("./controllers/UserController");
const whitelist = ["http://localhost:3000", "http://developer2.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
  },
};
app.use(cors(corsOptions));

app.use(logger("dev"));

const dbUrl = config.dbUrl;

var options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless;

app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
  })
);

app.use(express.json());
app.use(errors.errorHandler);

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", users);
app.use("/posts", postsRouter);
app.use("/events", eventsRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
