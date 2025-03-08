// models/news.js
import mongoose, { Schema } from "mongoose";

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String, // Just store the URL directly 
    },
  },
  {
    timestamps: true,
  }
);

export const News = mongoose.model("News", NewsSchema);