const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
    collegeID: String,
    name: String,
    email: { type: String, required: true },
    contactNumber: String,
    resume: String, 
    resumeUploadDate: Date, 
});

const StudentsModel = mongoose.model("students", StudentsSchema);
module.exports = StudentsModel;