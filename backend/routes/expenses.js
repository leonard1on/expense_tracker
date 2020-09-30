const router = require("express").Router();
const { where } = require("../models/expense.model");
let Expense = require("../models/expense.model");

router.route("/").get((req, res) => {
  Expense.find()
    .then((expenses) => res.json(expenses))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const catId = req.body.catId;
  const accId = req.body.accId;
  const amount = req.body.amount;
  const description = req.body.description;
  const newExpense = new Expense({ userId, catId, accId, amount, description });

  newExpense
    .save()
    .then(() => res.json("Expense added successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Expense.findById(req.params.id)
    .then((expense) => res.json(expense))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/uid/:id").get((req, res) => {
  Expense.find({ userId: req.params.id })
    .then((expense) => res.json(expense))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/reports/:id").get((req, res) => {
  Expense.find({ userId: req.params.id }).then((expenses) => {
    const reports = [];
    expenses.map((exp) => {
      const index = reports.findIndex((e) => e.accId === exp.accId);
      if (index < 0) {
        exp.description = 1;
        console.log("true");
        reports.push(exp);
      } else {
        console.log("false");
        reports[index].amount += exp.amount;
        reports[index].description += 1;
        console.log(reports);
      }
    });
    res.json(reports);
  });
});

router.route("/:id").delete((req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(() => res.json("Expense deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/uid/:id").delete((req, res) => {
  Expense.deleteMany({ accId: req.params.id })
    .then(() => res.json("Expenses deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Expense.findById(req.params.id)
    .then((expense) => {
      expense.userId = req.body.userId;
      expense.catId = req.body.catId;
      expense.accId = req.body.accId;
      expense.amount = req.body.amount;
      expense.description = req.body.description;

      expense
        .save()
        .then(() => res.json("Expense updated successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/cid").post((req, res) => {
  Expense.find({
    userId: req.body.userId,
    catId: req.body.catId,
  })
    .then((expense) => res.json(expense))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
