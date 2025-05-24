const express = require("express");
const router = express.Router();
const passport = require("passport");
const logInController = require("../controllers/loginController");

router.get("/", logInController.logInPage);

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-form",
    failureFlash: true,
  }),
);

module.exports = router;
