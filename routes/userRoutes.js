const express = require("express");
const { signUpUser, signInUser } = require("../controller/userController");

const router = express.Router();

// Sign-up API
router.post("/signup", signUpUser);
//Sign-in API
router.post("/signin", signInUser);

module.exports = router;
