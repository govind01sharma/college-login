const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true }, // Reference to Students model
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'college', required: true }, // Reference to College model (Student's ID)
    resume: {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true }, // Cloud storage link (AWS S3, Firebase, etc.)
        uploadedAt: { type: Date, default: Date.now }
    },
    createdAt: { type: Date, default: Date.now }
});

const UploadModel = mongoose.model("uploads", UploadSchema);
module.exports = UploadModel;
