const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");

const Document = require("../models/Document");
const Signature = require("../models/Signature");

exports.generateSignedPdf = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

   const signatures = await Signature.find();

console.log("Document ID:", id);
console.log("All Signatures:", signatures);

    console.log("Signatures Found:", signatures);

    const pdfPath = path.join(
      __dirname,
      "..",
      document.filePath
    );

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({
        message: "Original PDF not found",
      });
    }

    const existingPdfBytes =
      fs.readFileSync(pdfPath);

    const pdfDoc =
      await PDFDocument.load(
        existingPdfBytes
      );

    const pages = pdfDoc.getPages();

    const firstPage = pages[0];

    // Simple visible signature for demo
   firstPage.drawText(
  "Signed By: Shreya Jain",
  {
    x: 100,
    y: 500,
    size: 24,
    color: rgb(0, 0, 1),
  }
);

firstPage.drawText(
  "Status: Signed",
  {
    x: 100,
    y: 470,
    size: 18,
    color: rgb(0, 0.5, 0),
  }
);

    const pdfBytes =
      await pdfDoc.save();

    const signedDir = path.join(
      __dirname,
      "..",
      "signed"
    );

    if (!fs.existsSync(signedDir)) {
      fs.mkdirSync(signedDir);
    }

    const signedFileName =
      `signed_${Date.now()}_${document.fileName}`;

    const signedFilePath =
      path.join(
        signedDir,
        signedFileName
      );

    fs.writeFileSync(
      signedFilePath,
      pdfBytes
    );

    res.status(200).json({
      success: true,
      message:
        "Signed PDF generated successfully",
      file:
        "/signed/" +
        signedFileName,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};