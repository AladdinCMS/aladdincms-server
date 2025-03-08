// models/programme.js
import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});

const ProgrammeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
    },
    ageRange: {
      type: String,
    },
    details: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tickets: [TicketSchema],
  },
  {
    timestamps: true,
  }
);

export const Programme = mongoose.model("Programme", ProgrammeSchema);