import { User } from "../models/auth.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });


    await newUser.save();

    res.status(201).json({ message: `${role} has been registered successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  
