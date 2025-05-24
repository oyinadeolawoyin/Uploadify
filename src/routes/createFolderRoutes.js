const express = require("express");
const router = express.Router();
const createFolderRoutes = require("../controllers/createFolderController");
const { body } = require("express-validator");

const validateForm = [
  body("name")
    .matches(/^[A-Za-z0-9_.-]+$/)
    .withMessage(
      "Folder name can only contain letters, numbers, underscores, dots, or dashes.",
    )
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Folder name must be between 3 and 30 characters.")
    .escape(),
];

router.get("/", createFolderRoutes.createFolderForm);
router.post("/", validateForm, createFolderRoutes.createFolder);

module.exports = router;
