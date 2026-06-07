const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Document = require("../models/Document");

router.post(
    "/upload",
    upload.single("document"),
    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded"
                });
            }

            const document = new Document({
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileSize: req.file.size
            });

            await document.save();

            res.status(201).json({
                success: true,
                message: "File uploaded successfully",
                document
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
);

module.exports = router;