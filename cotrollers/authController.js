const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const { username, password } = req.body;

      const candidate = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user the same name already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User has created" });
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data ",
        });
      }

      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password. Try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      return res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Error! Try again" });
    }
  }
}

module.exports = new authController();
