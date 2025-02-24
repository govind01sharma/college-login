const StudentsModel = require("../models/Students");

// Controller to get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await StudentsModel.find({});
        res.json({ success: true, students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { getAllStudents };
