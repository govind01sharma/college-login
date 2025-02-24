const path = require("path");
const StudentsModel = require("../models/Students");
const CollegeModel = require("../models/College");

// Update Student Details with Resume Upload
const updateStudent = async (req, res) => {
    try {
        const { name, email, contactNumber } = req.body;
        const collegeID = req.params.collegeID;
        const resumePath = req.file ? req.file.path : null;

        // Prepare the update object
        const updateFields = { name, email, contactNumber };
        if (resumePath) {
            updateFields.resume = resumePath;
            updateFields.resumeUploadDate = new Date(); // Set the current date and time
        }

        // Update Students collection
        const updatedStudent = await StudentsModel.findOneAndUpdate(
            { collegeID: collegeID },
            updateFields,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Update College collection
        const updatedCollege = await CollegeModel.findOneAndUpdate(
            { collegeID: collegeID },
            { name: name, email: email }, // Update name and email in College model
            { new: true }
        );

        if (!updatedCollege) {
            return res.status(404).json({ success: false, message: "College not found" });
        }

        res.json({ success: true, student: updatedStudent });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = { updateStudent };