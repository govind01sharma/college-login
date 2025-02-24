const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    collegeID: { type: String, unique: true },
});

// Function to generate a random alphanumeric ID
const generateAlphanumericID = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

// Pre-save hook to generate a unique collegeID
CollegeSchema.pre('save', async function (next) {
    if (this.isNew && !this.collegeID) {
        do {
            this.collegeID = generateAlphanumericID(6);
        } while (await mongoose.model('college').exists({ collegeID: this.collegeID }));
    }
    next();
});

module.exports = mongoose.model("college", CollegeSchema);
