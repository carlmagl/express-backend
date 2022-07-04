const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;
const config = require("./config");

const postsRouter = require("./routes/posts");

app.use(logger("dev"));

const dbUrl = config.dbUrl;

var options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/posts", postsRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
