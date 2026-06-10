const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    signer: {
      type: String,
      required: true,
    },

    xPercent: {
      type: Number,
      required: true,
    },

    yPercent: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "signed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Signature",
  signatureSchema
);