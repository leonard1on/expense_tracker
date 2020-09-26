const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const uri = process.env.URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB successfully connected");
});
app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
