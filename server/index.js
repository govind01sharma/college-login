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


    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        CollegeModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        // Include collegeID in the response
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
    

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check for missing or empty values
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if email already exists
        const existingCollege = await CollegeModel.findOne({ email });
        if (existingCollege) {
            return res.json({ success: false, message: "Email already exists" });
        }

        // If validation passes, create a new college entry
        const college = await CollegeModel.create({ name, email, password, role });

        // If the role is "student", also store the data in the Students collection
        if (role === "Student") {
            await StudentsModel.create({
                collegeID: college.collegeID, // Use the generated collegeID
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

app.listen(3001, () => {
    console.log("Server is running");
});