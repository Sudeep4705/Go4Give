const express = require("express");
const Admin = require("../model/admin/admin");
const router = express.Router()
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");

// admin
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("4705", 10);
    const admin = new Admin({
      username: "sudeep",
      email: "sudeep@gmail.com",
      password: hashedPassword,
      role: "admin",    
    });

    const owner = await admin.save();

    const token = jsonWebToken.sign({ id: owner._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000
});
    res.status(201).json({ success: true, message: "Admin created", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      success: false,
      message: "username and password are required",
    });
  }
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.json({
        success: false,
        message: "invalid username Your not a Admin",
      });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid password" });
    }
    const token = jsonWebToken.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000
});
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

module.exports = router;    