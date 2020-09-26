const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
