const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const studentsRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const getStudentByCollegeIDRoutes = require("./routes/getStudentByCollegeID");
const updateStudentRoutes = require("./routes/updateStudent");
const resumeRoutes = require("./routes/resume");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/students", studentsRoutes);
app.use("/auth", authRoutes);
app.use("/getStudentByCollegeID", getStudentByCollegeIDRoutes);
app.use("/updateStudent", updateStudentRoutes);
app.use("/resume", resumeRoutes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
