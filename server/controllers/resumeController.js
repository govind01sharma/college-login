const path = require("path");
const fs = require("fs");

// Serve resume files for download
const downloadResume = (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File not found:", filePath);
            return res.status(404).json({ success: false, message: "File not found" });
        }
        res.download(filePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ success: false, message: "Error downloading file" });
            }
        });
    });
};

module.exports = { downloadResume };
