const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Accounts = require("./routes/accounts");
const Categories = require("./routes/categories");
const Users = require("./routes/users");
const Expenses = require("./routes/expenses");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
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

app.use("/accounts", Accounts);
app.use("/categories", Categories);
app.use("/users", Users);
app.use("/expenses", Expenses);

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
