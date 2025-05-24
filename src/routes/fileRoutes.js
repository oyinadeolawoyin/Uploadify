const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fileController = require("../controllers/fileController");

router.get("/", fileController.fileUpload);
router.post("/", upload.single("file"), fileController.uploadFile);

module.exports = router;
