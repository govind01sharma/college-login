const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");

const router = express.Router();

// Routes using controller functions
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;