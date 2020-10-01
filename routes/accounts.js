const router = require("express").Router();
let Account = require("../models/account.model");

router.route("/").get((req, res) => {
  Account.find()
    .then((accounts) => res.json(accounts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const type = req.body.type;
  const name = req.body.name;
  const money = req.body.money;
  const newAccount = new Account({ userId, type, name, money });

  newAccount
    .save()
    .then(() => res.json("Account added successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Account.findById(req.params.id)
    .then((account) => res.json(account))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/uid/:id").get((req, res) => {
  Account.find()
    .where("userId")
    .equals(req.params.id)
    .then((account) => res.json(account))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Account.findByIdAndDelete(req.params.id)
    .then(() => res.json("Account deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Account.findById(req.params.id)
    .then((account) => {
      account.userId = req.body.userId;
      account.type = req.body.type;
      account.name = req.body.name;
      account.money = req.body.money;

      account
        .save()
        .then(() => res.json("Account updated successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
