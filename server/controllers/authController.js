const CollegeModel = require("../models/College");
const StudentsModel = require("../models/Students");

// Login Controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await CollegeModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "No record existed" });
        }

        if (user.password !== password) {
            return res.json({ success: false, message: "The password is incorrect" });
        }

        res.json({
            success: true,
            role: user.role,
            collegeID: user.collegeID
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Register Controller
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingCollege = await CollegeModel.findOne({ email });
        if (existingCollege) {
            return res.json({ success: false, message: "Email already exists" });
        }

        const college = await CollegeModel.create({ name, email, password, role });

        if (role === "Student") {
            await StudentsModel.create({
                collegeID: college.collegeID,
                name: college.name,
                email: college.email,
                contactNumber: null,
                resume: null, // Initialize resume field as null
            });
        }

        res.json({ success: true, college });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { loginUser, registerUser };
