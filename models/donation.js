// models/donation.js
import mongoose, { Schema } from "mongoose";

const DonationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Donation = mongoose.model("Donation", DonationSchema);