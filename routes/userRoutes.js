const express = require("express");
const {
  signUpUser,
  signInUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} = require("../controller/userController");

const router = express.Router();

// Sign-up API
router.post("/signup", signUpUser);

//Sign-in API
router.post("/signin", signInUser);

//get all users
router.get("/getUsers", getAllUsers);

//delete user by id
router.delete("/deleteUser/:id", deleteUserById);

// get user by id
router.get("/getUser/:id", getUserById);

// update user by id
router.put("/updateUser/:id", updateUserById);

module.exports = router;
