const mongoose = require('mongoose')

const CollegeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
})

const CollegeModel = mongoose.model("college", CollegeSchema)
module.exports = CollegeModel