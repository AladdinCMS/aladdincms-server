// controllers/programmeController.js
import { Programme } from "../models/programme.js";

// Get all programmes
export const getAllProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.find();
    res.status(200).json(programmes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create new programme
export const createProgramme = async (req, res) => {
  try {
    const { name, location, ageRange, details, date, tickets } = req.body;
    
    const newProgramme = new Programme({
      name,
      location,
      ageRange,
      details,
      date,
      tickets,
    });
    
    await newProgramme.save();
    res.status(201).json({ message: "Programme created successfully", programme: newProgramme });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update programme
export const updateProgramme = async (req, res) => {
  try {
    const { name, location, ageRange, details, date, tickets } = req.body;
    
    const updatedProgramme = await Programme.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        ageRange,
        details,
        date,
        tickets,
      },
      { new: true }
    );
    
    if (!updatedProgramme) {
      return res.status(404).json({ message: "Programme not found" });
    }
    
    res.status(200).json({ message: "Programme updated successfully", programme: updatedProgramme });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete programme
export const deleteProgramme = async (req, res) => {
  try {
    const result = await Programme.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: "Programme not found" });
    }
    
    res.status(200).json({ message: "Programme deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};