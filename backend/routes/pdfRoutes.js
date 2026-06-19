const express = require("express");

const router = express.Router();

const {
generateSignedPdf,
} = require(
"../controllers/pdfController"
);

router.get(
"/generate/:id",
generateSignedPdf
);

module.exports = router;
