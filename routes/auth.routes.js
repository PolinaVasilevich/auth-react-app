const Router = require("express");
const { check } = require("express-validator");
const authController = require("../cotrollers/authController");

const router = new Router();

router.post(
  "/register",
  [
    check("password", "Min 3 characters").isLength({ min: 3 }),
    check("username", "Username cannot be empty").notEmpty(),
  ],
  authController.registration
);

router.post(
  "/login",
  [
    check("username", "Enter username").exists(),
    check("password", "Enter password").exists(),
  ],
  authController.login
);

module.exports = router;
