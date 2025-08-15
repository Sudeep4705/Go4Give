
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const express = require("express");
const router = express.Router()
const User = require("../model/user/user");

router.post("/register", async (req, res) => {
    console.log("Register route hit");
  const { email, username, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ success: false, message: "Missing" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUser = new User({ email, username, password: hashedPassword });
    await NewUser.save();
    const token = jsonWebToken.sign(
      { id: NewUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
  sameSite: "None", // allow cross-site cookies (needed if frontend & backend are on different domains)
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});


    console.log("Returning signup success response");
   return res.json({ success:true,message:"Signup Successfully completed"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
   console.log("Login route hit");
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      success: false,
      message: "username and password are required",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "invalid username" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid password" });
    }
    const token = jsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
  sameSite: "None", // allow cross-site cookies (needed if frontend & backend are on different domains)
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

    return res.json({ success: true ,message:"Login successfully"});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
  sameSite: "None", // allow cross-site cookies (needed if frontend & backend are on different domains)
  maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// verify
router.get("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true, user: decoded }); // optionally return user info
  } catch (error) {
    return res.json({ loggedIn: false });
  }
});

module.exports = router


