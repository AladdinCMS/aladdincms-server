import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
import cors from "cors";
import fileUpload from "express-fileupload";

// Import routers
import { authRouter } from "./router/authRouter.js"; // Keep existing auth router
// import { volunteerRouter } from "./router/volunteerRouter.js";
import { donationRouter } from "./router/donationRouter.js";
import { programmeRouter } from "./router/programmeRouter.js";
import { newsRouter } from "./router/newsRouter.js";
import { documentRouter } from "./router/documentRouter.js";
import { adminRouter } from "./router/adminRouter.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const Port = process.env.PORT || 3000;
const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to The Green Team API!");
});

// Use routes
app.use("/api/v1/auth", authRouter); // Keep existing auth router
app.use("/api/v1/auth/admin", adminRouter); // Keep existing auth router
// app.use("/api/v1/volunteers", volunteerRouter);
app.use("/api/v1/donations", donationRouter);
app.use("/api/v1/programmes", programmeRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/documents", documentRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "greenTeam" });
    app.listen(Port, () => {
      console.log(`Server running on port ${Port}`);
      console.log("MongoDB connected...");
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();