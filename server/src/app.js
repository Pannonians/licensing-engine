const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
var morgan = require("morgan");
const errorMiddleware = require("./middleware/error.middleware");
var path = require("path");
var rfs = require("rotating-file-stream"); // version 2.x
const bodyParser = require('body-parser');

const apiRoute = require("./routes");

var accessLogStream = rfs.createStream("access.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  path: path.join(__dirname, "../../server_log"), // root of the project
  compress: (source, dest) => "cat " + source + " | gzip -c9 > " + dest + ".gz"
});

const app = express();

app.use(express.json({limit: '15mb'}));
app.use(express.urlencoded({limit: '15mb'}));

const morganOptions =
  process.env.NODE_ENV === "development" ? {} : { stream: accessLogStream };

app.use(morgan("combined", morganOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors())
app.use(cors({
  origin: '*'
}));
app.options('*', cors())
app.use(helmet());

app.use("/api", apiRoute);

app.use(errorMiddleware);

module.exports = app;
