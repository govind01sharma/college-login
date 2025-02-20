const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name is required
    email: { type: String, unique: true, required: true },  // Email is required
    password: { type: String, required: true },  // Password is required
    role: { type: String, required: true },  // Role is required
    collegeID: { type: String, unique: true },  // New field: collegeID
});

// Pre-save hook to generate collegeID
CollegeSchema.pre('save', async function (next) {
    if (!this.collegeID) {
        let isUnique = false;
        let generatedID;

        // Generate a unique 6-digit alphanumeric ID
        while (!isUnique) {
            generatedID = generateAlphanumericID(6);
            const existingCollege = await mongoose.model('college').findOne({ collegeID: generatedID });
            if (!existingCollege) {
                isUnique = true;
            }
        }

        this.collegeID = generatedID;
    }
    next();
});

// Helper function to generate alphanumeric ID
function generateAlphanumericID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const CollegeModel = mongoose.model("college", CollegeSchema);
module.exports = CollegeModel;
