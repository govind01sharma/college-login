const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const CollegeModel = require("./models/College");
const StudentsModel = require("./models/Students");

const studentsRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const getStudentByCollegeIDRoutes = require("./routes/getStudentByCollegeID");

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


app.use("/students", studentsRoutes);
app.use("/auth", authRoutes); 
app.use("/getStudentByCollegeID", getStudentByCollegeIDRoutes);

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
