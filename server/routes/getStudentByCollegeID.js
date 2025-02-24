const express = require("express");
const { getStudentByCollegeID } = require("../controllers/getStudentByCollegeIDController");

const router = express.Router();

router.get("/:collegeID", getStudentByCollegeID);

module.exports = router;