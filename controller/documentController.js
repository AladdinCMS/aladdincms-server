// controllers/documentController.js
import { Document } from "../models/document.js";

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

// Create new document (simplified without file upload)
export const createDocument = async (req, res) => {
  try {
    const { name, type, size, uploadedBy, url, tags } = req.body;
    
    const newDocument = new Document({
      name,
      type,
      size,
      uploadedBy,
      url,
      tags,
      uploadDate: new Date(),
    });
    
    await newDocument.save();
    res.status(201).json({ message: "Document created successfully", document: newDocument });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
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
    
    res.status(200).json({ message: "Document tags updated successfully", document: updatedDocument });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const result = await Document.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }
    
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};