const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../model/user/user");

// ---------------------------
// REGISTER
// ---------------------------
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  if (!username || !email || !password)
    return res.json({ success: false, message: "Missing fields" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    // Create tokens
    const accessToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// ---------------------------
// LOGIN
// ---------------------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ success: false, message: "Missing username/password" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ success: false, message: "Invalid username" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid password" });

    // Create tokens
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// ---------------------------
// LOGOUT
// ---------------------------
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// ---------------------------
// VERIFY ACCESS TOKEN
// ---------------------------
router.get("/verify", (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
});

// ---------------------------
// REFRESH ACCESS TOKEN
// ---------------------------
router.get("/refresh-token", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.json({ success: false, message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: "Invalid refresh token" });
  }
});

module.exports = router;
