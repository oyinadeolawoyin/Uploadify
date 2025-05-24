const { use } = require("passport");
const prisma = require("../services/userService");
const { validationResult } = require("express-validator");

function renderSignUpForm(req, res) {
  res.render("sign-up-form");
}

async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up-form", {
      errors: errors.array(),
    });
  }

  try {
    const { username, password, email } = req.body;
    await prisma.createUser({ username, password, email });
    res.redirect("/login-form");
  } catch (err) {
    console.log(err.message);
    if (err.code === "P2002") {
      // Prisma unique constraint error
      return res.status(400).render("sign-up-form", {
        errors: [{ msg: "Username already exists" }],
      });
    }
    res.status(500).render("errorpage", {
      errors: [{ msg: "Server Error" }],
    });
  }
}

module.exports = {
  renderSignUpForm,
  createUser,
};