// models/document.js
import mongoose, { Schema } from "mongoose";

const DocumentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    type: {
      type: String,
      enum: ["pdf", "word", "excel", "image", "other"],
      required: [true, "Type is required."],
    },
    size: {
      type: String,
    },
    uploadedBy: {
      type: String, // Just store the name instead of reference
      required: true,
    },
    url: {
      type: String, // Store a placeholder or local path
    },
    tags: {
      type: [String],
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model("Document", DocumentSchema);