import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";

// Verify JWT token middleware
export const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authHeader.split(" ")[1];
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find the admin user
      const admin = await Admin.findById(decoded.id).select("-password");
      
      if (!admin) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Add user data to request
      req.user = admin;
      req.userId = admin._id;
      req.userRole = decoded.role;
      
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Check if user is super admin
export const isSuperAdmin = (req, res, next) => {
  if (req.userRole !== "super admin") {
    return res.status(403).json({ 
      message: "Access denied. Super admin permissions required." 
    });
  }
  next();
};