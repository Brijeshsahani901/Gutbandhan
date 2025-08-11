import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, name, email, phone, role, status} = req.body;

    console.log(email)

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email already in use",
      });
    }

    // Create new user
    const user = new User({
      username,
      password, // Will be hashed by pre-save hook
      name,
      email,
      phone,
      profile_created : null ,
      profile_id : null,
      role: role || "U",
      status: status || "A",
    });


    await user.save();

    // Return response without password
    const userObj = user.toObject();
    delete userObj.password;

    

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: userObj,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error occurred while registering user",
      err : err
    });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched)
      return res.status(401).json({ message: "Invalid Password" });


    // Check if user is active
    if (user.status !== "A") {
      return res.status(403).json({
        status: false,
        message: "Account is inactive",
      });
    }


    const token = generateToken(user._id, user.role);

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Return response without password
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      status: true,
      message: "Login successful",
      user: userObj,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error occurred while logging in",
    });
  }
};

export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Current password is incorrect",
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error occurred while changing password",
    });
  }
};
