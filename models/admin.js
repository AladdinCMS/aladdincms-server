import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      //   required: [true, "FirstName is required."],
    },

    lastName: {
      type: String,
      //   required: [true, "LastName is required."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

    role: {
      type: String,
      default: "admin",
      enum: ["admin", "super admin"],
      required: [true, "Please select a role."],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      //   required: [true, "Please select a gender."],
    },

    // this is for the contact info

    phoneNumber: {
      type: String,
      //   required: [true, "Phone number is required."],
    },

    address: {
      type: String,
      //   required: [true, "Address is required."],
    },
  },

  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
