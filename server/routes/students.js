const express = require("express");
const { getAllStudents } = require("../controllers/studentsController");

const router = express.Router();

router.get("/", getAllStudents);

module.exports = router;