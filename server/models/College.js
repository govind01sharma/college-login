const mongoose = require('mongoose')

const CollegeSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },  // Ensure email is unique
    password: String,
    role: String,
})

const CollegeModel = mongoose.model("college", CollegeSchema)
module.exports = CollegeModel;