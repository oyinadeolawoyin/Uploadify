const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");

router.get("/:id", folderController.folderPage);
router.post("/:id/delete", folderController.deleteFoldersFile);

module.exports = router;
