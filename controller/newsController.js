// controllers/newsController.js
import { News } from "../models/news.js";

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
    const { title, category, content, date, image } = req.body;
    
    const newNews = new News({
      title,
      category,
      content,
      date,
      image,
    });
    
    await newNews.save();
    res.status(201).json({ message: "News article created successfully", news: newNews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update news article
export const updateNews = async (req, res) => {
  try {
    const { title, category, content, date, image } = req.body;
    
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        content,
        date,
        image,
      },
      { new: true }
    );
    
    if (!updatedNews) {
      return res.status(404).json({ message: "News article not found" });
    }
    
    res.status(200).json({ message: "News article updated successfully", news: updatedNews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete news article
export const deleteNews = async (req, res) => {
  try {
    const result = await News.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: "News article not found" });
    }
    
    res.status(200).json({ message: "News article deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};