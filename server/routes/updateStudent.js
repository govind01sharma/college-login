const express = require("express");
const multer = require("multer");
const path = require("path");
const { updateStudent } = require("../controllers/updateStudentController");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

const upload = multer({ storage: storage });

// Route using the controller function
router.put("/:collegeID", upload.single("resume"), updateStudent);

module.exports = router;