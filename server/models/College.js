const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name is required
    email: { type: String, unique: true, required: true },  // Email is required
    password: { type: String, required: true },  // Password is required
    role: { type: String, required: true },  // Role is required
});

const CollegeModel = mongoose.model("college", CollegeSchema);
module.exports = CollegeModel;
