const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/add").post((req, res) => {
  const id = req.body.id;
  const newUser = new User({ id });

  newUser
    .save()
    .then(() => res.json("User added succesfully"))
    .catch((err) => res.status(400).json("Error: ", err));
});

module.exports = router;
