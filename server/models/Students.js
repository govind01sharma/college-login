const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'college', required: true }, // Reference to College model
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    resume: {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true }, // Cloud storage link (AWS S3, Firebase, etc.)
        uploadedAt: { type: Date, default: Date.now }
    },
    createdAt: { type: Date, default: Date.now }
});

const StudentsModel = mongoose.model("students", StudentsSchema);
module.exports = StudentsModel;