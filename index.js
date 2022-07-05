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
const userRouter = require("./controllers/UserController");

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

setTimeout(() => {}, 1000);
app.use(express.json()); // middleware for parsing application/json
app.use(errors.errorHandler); // middleware for error responses

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", users); // middleware for listening to routes
app.use("/posts", postsRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
