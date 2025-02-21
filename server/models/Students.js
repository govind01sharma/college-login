const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
    collegeID: String,
    name: String,
    email: { type: String, required: true },
    contactNumber: String,
    resume: String, // New field to store the resume file path or URL
    resumeUploadDate: Date, // New field to store the date and time of resume upload
});

const StudentsModel = mongoose.model("students", StudentsSchema);
module.exports = StudentsModel;