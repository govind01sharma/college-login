const express = require("express");
const { downloadResume } = require("../controllers/resumeController");

const router = express.Router();

// Route using the controller function
router.get("/:filename", downloadResume);

module.exports = router;