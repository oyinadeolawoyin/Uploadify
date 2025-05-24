const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

const validateForm = [
  body("username")
    .matches(/^[A-Za-z0-9_.-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores, dots, or dashes.",
    )
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters.")
    .escape(),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character."),
];

router.get("/", userController.renderSignUpForm);
router.post("/", validateForm, userController.createUser);

module.exports = router;
