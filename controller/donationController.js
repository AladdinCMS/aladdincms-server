// controllers/donationController.js
import { Donation } from "../models/donation.js";

// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create new donation
export const createDonation = async (req, res) => {
  try {
    const { name, email, amount, date, message } = req.body;
    const newDonation = new Donation({
      name,
      email,
      amount,
      date,
      message,
    });
    await newDonation.save();
    res.status(201).json({ message: "Donation recorded successfully", donation: newDonation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get donation statistics
export const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalAmount = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);
    const avgDonation = totalAmount[0]?.total / totalDonations || 0;
    res.status(200).json({
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
      avgDonation
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete all donations
export const deleteAllDonations = async (req, res) => {
  try {
    const result = await Donation.deleteMany({});
    res.status(200).json({ 
      message: "All donations deleted successfully", 
      count: result.deletedCount 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a single donation by ID
export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};