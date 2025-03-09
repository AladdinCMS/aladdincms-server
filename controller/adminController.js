import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";

export const signUp = async (req, res) => {
  try {
    const {
      // firstName,
      // lastName,
      email,
      password,
      role,
      // gender,
      // phoneNumber,
      // address,
    } = req.body;

    const user = await Admin.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      // firstName,
      // lastName,
      // gender,
      // phoneNumber,
      // address,
      password: hashedPassword,
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        message: `${user.role} has been logged in successfully`,
        token: token,
        role: user.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// this is for getting all users

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     return res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // get a single user
// export const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // this is for updating a user

// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       firstName,
//       lastName,
//       email,
//       role,
//       gender,
//       phoneNumber,
//       address,
//       emergencyContactName,
//       emergencyContactNumber,
//     } = req.body;

//     const user = await User.findByIdAndUpdate(
//       id,
//       {
//         firstName,
//         lastName,
//         gender,
//         phoneNumber,
//         address,
//         emergencyContactName,
//         emergencyContactNumber,
//         email,
//         role,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // delete a user

// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
