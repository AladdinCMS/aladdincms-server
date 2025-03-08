import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
import cors from "cors";
import fileUpload from "express-fileupload";

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

app.use("/", (req, res) => {
  res.send("Hello World!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "greenTeam" });
    app.listen(Port, () => {
      console.log("MongoDB connected...");
    });

  } catch (error) {
    console.log(error);
  }
};

connectDB();
