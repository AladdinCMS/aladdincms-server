import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required."],
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
      default: "volunteer",
      enum: ["volunteer", "participant", "admin"],
      required: [true, "Please select a role."],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
