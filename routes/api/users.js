const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// import User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "bad-request" });
  }
  // check user if exists
  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: "user-already-exists" });
      const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      newUser.save().then((user) => {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.send({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    })
    .catch((err) => res.send({ msg: `newUser.save() error ${err}` }));
});

module.exports = router;
