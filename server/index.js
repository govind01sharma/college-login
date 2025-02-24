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
const updateStudentRoutes = require("./routes/updateStudent");
const resumeRoutes = require("./routes/resume");

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

app.use("/students", studentsRoutes);
app.use("/auth", authRoutes); 
app.use("/getStudentByCollegeID", getStudentByCollegeIDRoutes);
app.use("/updateStudent", updateStudentRoutes);
app.use("/resume", resumeRoutes);


app.listen(3001, () => {
    console.log("Server is running");
});
