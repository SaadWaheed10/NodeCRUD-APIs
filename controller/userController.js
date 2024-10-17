const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//signUp controller
const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Check if it's a validation error
    if (error.name === "ValidationError") {
      const emailError = error.errors.email
        ? error.errors.email.message
        : "Validation error occurred";
      return res.status(400).json({ message: emailError });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//signIn contoller
const signInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get all user contoller
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//delete user by id
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      res
        .status(404)
        .json({ message: `Cannot find the user with this ID ${id}` });
    }
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);

    if (!findUser) {
      res.status(404).json({ message: `Cannot find user with this ID ${id}` });
    }
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user by ID
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, req.body);

    if (!updateUser) {
      res.status(404).json({ message: `Cannot find user with this  ID ${id}` });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUpUser,
  signInUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
