const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const CollegeSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    email: { type: String, unique: true, required: true },  
    password: { type: String, required: true },  
    role: { type: String, required: true },  
    collegeID: { type: String, unique: true },  
});

// Pre-save hook to generate collegeID
CollegeSchema.pre('save', async function (next) {

    // if (this.isModified('password')) {  // Hash only if password is modified
    //     this.password = await bcrypt.hash(this.password, 10);
    // }

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
