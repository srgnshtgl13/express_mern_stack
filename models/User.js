const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./Item");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /(\S+)@(\S+)\.(\S+)/.test(v),
      message: "email-not-valid",
    },
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
