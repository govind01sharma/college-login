const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'college'}, // Reference to College model
    name: String,
    email: { type: String, required: true},
    contactNumber: String,
    resume: {
        fileName: String,
        fileUrl: String, // Cloud storage link (AWS S3, Firebase, etc.)
        uploadedAt: { type: Date, default: Date.now }
    },
});

const StudentsModel = mongoose.model("students", StudentsSchema);
module.exports = StudentsModel;