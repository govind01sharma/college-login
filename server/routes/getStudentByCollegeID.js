const express = require("express");
const { getStudentByCollegeID } = require("../controllers/getStudentByCollegeIDController");

const router = express.Router();

// Route using the controller function
router.get("/:collegeID", getStudentByCollegeID);

module.exports = router;