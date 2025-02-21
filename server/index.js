const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CollegeModel = require("./models/College");
const StudentsModel = require("./models/Students");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection with Error Handling
mongoose.connect("mongodb://127.0.0.1:27017/college")
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    CollegeModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json({
                    success: true,
                    role: user.role,
                    collegeID: user.collegeID
                });
            } else {
                res.json({ success: false, message: "The password is incorrect" });
            }
        } else {
            res.json({ success: false, message: "No record existed" });
        }
    })
    .catch(err => res.status(500).json({ success: false, message: "Server error" }));
});

// Register Endpoint
app.post('/register', async (req, res) => {
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
            });
        }

        res.json({ success: true, college });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get Student Details by College ID
app.get('/students/:collegeID', async (req, res) => {
    try {
        const student = await StudentsModel.findOne({ collegeID: req.params.collegeID });
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.json({ success: true, student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update Student Details
app.put('/students/:collegeID', async (req, res) => {
    try {
        const { name, email, contactNumber } = req.body;
        const updatedStudent = await StudentsModel.findOneAndUpdate(
            { collegeID: req.params.collegeID },
            { name, email, contactNumber },
            { new: true }
        );
        
        if (!updatedStudent) return res.status(404).json({ success: false, message: "Student not found" });
        
        res.json({ success: true, student: updatedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(3001, () => {
    console.log("Server is running");
});
