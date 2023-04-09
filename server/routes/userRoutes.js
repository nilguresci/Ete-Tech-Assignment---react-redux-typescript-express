const express = require("express");
const router = express.Router();
const users = require("../../database/user.json");

const { registerUser, loginUser } = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
