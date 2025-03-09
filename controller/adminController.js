import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";

// Admin login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Log what we're searching for
    console.log("Attempting login with email:", email);
    
    const user = await Admin.findOne({ email });
    
    // Check if user exists
    if (!user) {
      console.log("No user found with email:", email);
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("Found user:", {
      email: user.email,
      role: user.role,
      // Don't log the actual password!
      hasPassword: !!user.password
    });
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log("Password match result:", isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: `${user.role} has been logged in successfully`,
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    return res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single admin by ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new admin (only super admin can do this)
export const createAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      gender,
      phoneNumber,
      address,
    } = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      gender,
      phoneNumber,
      address,
    });

    await newAdmin.save();

    // Return admin without password
    const adminResponse = { ...newAdmin._doc };
    delete adminResponse.password;

    res.status(201).json({
      message: "Admin created successfully",
      admin: adminResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      gender,
      phoneNumber,
      address,
    } = req.body;

    // Check if admin exists
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if updating email and if it's already in use
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "This email is already in use" });
      }
    }

    // Create update object
    const updateData = {
      firstName,
      lastName,
      email,
      role,
      gender,
      phoneNumber,
      address,
    };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};