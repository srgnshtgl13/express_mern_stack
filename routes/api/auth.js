const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");

// import User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "bad-request" });
  }
  // check user if exists
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "email-incorrect" });
      // compare passwords
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) res.status(400).json({ msg: "password-incorrect" });
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
    .catch((err) => res.send({ msg: `authenticate user error ${err}` }));
});

// @route   GET api/auth/user
// @desc    get current user by jwt token
// @access  private
router.get("/user", authMiddleware, (req, res) => {
  User.findOne({ _id: req.user.id }).select("-password").then((user) => {
    if (!user) res.status(404).json({ msg: "user-not-found" });
    res.send(user);
  });
});

module.exports = router;
