// controllers/documentController.js
import { Document } from "../models/document.js";
import { v2 as cloudinary } from "cloudinary";
import fetch from 'node-fetch';
import fs from 'fs';

const getResourceType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
      return 'raw';
    }
    return 'auto';
  };

// Get all documents
export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const downloadDocument = async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      // Get the Cloudinary URL
      const fileUrl = document.url;
      
      // Set the content-disposition header with the correct filename
      res.setHeader('Content-Disposition', `attachment; filename="${document.name}"`);
      
      // Fetch the file from Cloudinary
      const response = await fetch(fileUrl);
      
      // Pipe the response stream to our response
      response.body.pipe(res);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const createDocument = async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Request files:", req.files);
      
      const { name, type, uploadedBy } = req.body;
      let tags = [];
      
      // Parse tags if provided
      if (req.body.tags) {
        try {
          tags = JSON.parse(req.body.tags);
        } catch (e) {
          console.log("Error parsing tags:", e);
        }
      }
      
      // Check if file is provided
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const file = req.files.file;
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      const fileName = file.name;
      
      console.log("Uploading to Cloudinary:", fileName);
      
      // Determine the correct resource type
      const resourceType = getResourceType(fileName);
      console.log("Using resource type:", resourceType);
      
      // Upload to cloudinary with the correct resource type and use_filename option
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "green_team_documents",
        resource_type: resourceType,
        use_filename: true,  // This will use the original filename
        unique_filename: true // This ensures the filename is unique
      });
      
      console.log("Cloudinary result:", result);
      fs.unlinkSync(req.files.image.tempFilePath);
      
      const newDocument = new Document({
        name: name || fileName,
        type,
        size: fileSize,
        uploadedBy,
        url: result.secure_url,
        tags,
        uploadDate: new Date()
      });
      
      await newDocument.save();
      res.status(201).json({ message: "Document created successfully", document: newDocument });
    } catch (error) {
      console.log("Error in createDocument:", error);
      res.status(500).json({ message: "Internal Server Error: " + error.message });
    }
  };

// Update document tags
export const updateDocumentTags = async (req, res) => {
  try {
    const { tags } = req.body;

    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { tags },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res
      .status(200)
      .json({
        message: "Document tags updated successfully",
        document: updatedDocument,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Delete file from cloudinary if url exists
    if (document.url) {
      const publicId = document.url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`green_team_documents/${publicId}`);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
