import User from "../models/User.js"; // Import your User model here
import validator from "validator";
import dotenv from "dotenv";
//Dotenv configuration
dotenv.config({ path: "./config.env" });

// Create a new user
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address_1,
      address_2,
      mobile,
      selectedStates,
      selectedCountry,
      zipcode,
    } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      console.log("Invalid email address format");
      return res.status(400).json({ error: "Invalid email address format" });
    }

    // Validate mobile number
    const fullMobileNumber = mobile.phoneNumber; // Remove the country code from validation
    console.log("Full Mobile Number:", fullMobileNumber);

    if (!validator.isMobilePhone(fullMobileNumber, "any")) {
      console.log("Invalid mobile number format");
      return res.status(400).json({ error: "Invalid mobile number format" });
    }

    // Validate zip code
    if (
      typeof zipcode !== "number" ||
      isNaN(zipcode) ||
      zipcode.toString().length !== 6
    ) {
      console.log("Invalid zip code format");
      return res.status(400).json({ error: "Invalid zip code format" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      address_1,
      address_2,
      mobile,
      selectedStates,
      selectedCountry,
      zipcode,
    });

    await user.save();
    console.log("User created successfully");

    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.findByIdAndRemove(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to get states based on the selected country

const getStatesByCountry = async (req, res) => {
  const { country } = req.params;

  try {
    // Perform a Mongoose query to find states for the specified country
    const states = await User.find({
      "state.country": country,
    }).distinct("state.name");

    // Return the list of states as a response
    res.status(200).json(states);
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getStatesByCountry,
};
