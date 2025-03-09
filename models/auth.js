import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required."],
    },

    lastName: {
      type: String,
      required: [true, "LastName is required."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
    },

    role: {
      type: String,
      enum: ["volunteer", "participant", "admin"],
      required: [true, "Please select a role."],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please select a gender."],
    },

    // this is for the contact info

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
    },

    address: {
      type: String,
      required: [true, "Address is required."],
    },

    emergencyContactName: {
      type: String,
      required: [true, "Emergency contact name is required."],
    },

    emergencyContactNumber: {
      type: String,
      required: [true, "Emergency contact number is required."],
    },
  },

  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
