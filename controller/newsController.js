// controllers/newsController.js
import { News } from "../models/news.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
// Get all news
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create new news article
export const createNews = async (req, res) => {
  try {
    const { title, category, content, date } = req.body;
    let imageUrl = null;

    // Handle image upload if provided
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "green_team_news",
        }
      );
      imageUrl = result.secure_url;
    }

    fs.unlinkSync(req.files.image.tempFilePath);

    const newNews = new News({
      title,
      category,
      content,
      date,
      image: imageUrl,
    });

    await newNews.save();
    res
      .status(201)
      .json({ message: "News article created successfully", news: newNews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update news article
export const updateNews = async (req, res) => {
  try {
    const { title, category, content, date } = req.body;

    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    let imageUrl = news.image;

    // Handle image upload if provided
    if (req.files && req.files.image) {
      // Delete previous image if exists
      if (news.image) {
        const publicId = news.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`green_team_news/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: "green_team_news",
        }
      );
      imageUrl = result.secure_url;
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        content,
        date,
        image: imageUrl,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        message: "News article updated successfully",
        news: updatedNews,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete news article
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    // Delete image from cloudinary if exists
    if (news.image) {
      const publicId = news.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`green_team_news/${publicId}`);
    }

    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "News article deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
