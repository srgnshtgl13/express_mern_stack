const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

// Item Model
const Item = require("../../models/Item");
const User = require("../../models/User");

// @route   GET api/items
// @desc    get all items
// @access  Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) // -1: desc // 1: asc
    .then((items) => res.json(items));
});

// @route   POST api/items
// @desc    add item
// @access  private
router.post("/", auth, (req, res) => {
  !req.body.name && res.status(422).json({ msg: "validation-error" });
  const item = new Item({ name: req.body.name, user: req.user.id });
  item
    .save()
    .then((item) => {
      User.findOne({ _id: req.user.id }).then((user) => {
        user.items.push(item);
        user.save();
        res.json(item);
      });      
    })
    .catch((err) => res.status(500).json({ msg: "something-went-wrong" }));
});

// @route   DELETE api/items/:id
// @desc    delete item
// @access  private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
