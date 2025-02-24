const express = require("express");
const { downloadResume } = require("../controllers/resumeController");

const router = express.Router();

router.get("/:filename", downloadResume);

module.exports = router;