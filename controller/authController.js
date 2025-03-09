import { User } from "../models/auth.js";

export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      role,
      gender,
      phoneNumber,
      address,
      emergencyContactName,
      emergencyContactNumber,
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    const newUser = new User({
      firstName,
      lastName,
      gender,
      phoneNumber,
      address,
      emergencyContactName,
      emergencyContactNumber,
      email,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: `${role} has been registered successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
