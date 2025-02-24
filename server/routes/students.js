const express = require("express");
const StudentsModel = require("../models/Students");

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await StudentsModel.find({});
        res.json({ success: true, students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
