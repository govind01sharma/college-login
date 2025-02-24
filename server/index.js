const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const CollegeModel = require("./models/College");
const StudentsModel = require("./models/Students");

const studentsRoutes = require("./routes/students"); // Import students routes

const app = express();
app.use(express.json());
app.use(cors());
const fs = require("fs");
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

const upload = multer({ storage: storage });

// Database Connection with Error Handling
mongoose.connect("mongodb://127.0.0.1:27017/college")
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Serve resume files for download
app.get('/resume/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    console.log("Requested file path:", filePath); // Debugging

    if (fs.existsSync(filePath)) {
        res.download(filePath); // Stream the file to the client
    } else {
        console.error("File not found:", filePath); // Debugging
        res.status(404).json({ success: false, message: "File not found" });
    }
});

// Use Students Routes
app.use("/students", studentsRoutes);



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
                resume: null, // Initialize resume field as null
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

// Update Student Details with Resume Upload
app.put('/students/:collegeID', upload.single('resume'), async (req, res) => {
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
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running");
});
