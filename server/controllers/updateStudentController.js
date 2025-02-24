const path = require("path");
const StudentsModel = require("../models/Students");
const CollegeModel = require("../models/College");

const updateStudent = async (req, res) => {
    try {
        const { name, email, contactNumber } = req.body;
        const collegeID = req.params.collegeID;
        const resumePath = req.file ? req.file.path : null;

        const updateFields = { name, email, contactNumber };
        if (resumePath) {
            updateFields.resume = resumePath;
            updateFields.resumeUploadDate = new Date();
        }

        const updatedStudent = await StudentsModel.findOneAndUpdate(
            { collegeID: collegeID },
            updateFields,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const updatedCollege = await CollegeModel.findOneAndUpdate(
            { collegeID: collegeID },
            { name: name, email: email },
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