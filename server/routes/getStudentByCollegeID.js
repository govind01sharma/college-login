const express = require("express");
const router = express.Router();
const StudentsModel = require("../models/Students");

// Get Student Details by College ID
router.get('/:collegeID', async (req, res) => {
    try {
        const student = await StudentsModel.findOne({ collegeID: req.params.collegeID });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json({ success: true, student });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
