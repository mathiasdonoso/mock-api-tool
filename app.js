const compression = require("compression");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const schemaValidation = require("./src/utils/schema-validation");
const routes = require("./routes");

schemaValidation(path.join(__dirname, "./mocks"));

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use("*", routes);

module.exports = app;
