const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const CollegeModel = require("./models/College")
const StudentsModel = require("./models/Students")
const UploadsModel = require("./models/Uploads")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/college");

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    CollegeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    CollegeModel.create(req.body)
    .then(college => res.json(college))
    .catch(err => res.json)
})

app.listen(3001, () => {
    console.log("Server is running")
})