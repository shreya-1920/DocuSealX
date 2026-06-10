const express = require("express");
const router = express.Router();

const Signature = require("../models/Signature");

router.post("/", async (req, res) => {
  try {
    const signature = await Signature.create(
      req.body
    );

    res.status(201).json(signature);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:fileId", async (req, res) => {
  try {
    const signatures =
      await Signature.find({
        fileId: req.params.fileId,
      });

    res.json(signatures);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const signature =
      await Signature.findByIdAndUpdate(
        req.params.id,
        {
          xPercent:
            req.body.xPercent,
          yPercent:
            req.body.yPercent,
        },
        { new: true }
      );

    res.json(signature);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;