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

// this is for getting all users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get a single user
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// this is for updating a user

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
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

    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        gender,
        phoneNumber,
        address,
        emergencyContactName,
        emergencyContactNumber,
        email,
        role,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete a user

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
