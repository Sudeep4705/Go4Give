
// const bcrypt = require("bcryptjs");
// const jsonWebToken = require("jsonwebtoken");
// const express = require("express");
// const router = express.Router()
// const User = require("../model/user/user");

// router.post("/register", async (req, res) => {
//     console.log("Register route hit");
//   const { email, username, password } = req.body;
//   if (!username || !email || !password) {
//     return res.json({ success: false, message: "Missing" });
//   }
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const NewUser = new User({ email, username, password: hashedPassword });
//     await NewUser.save();
//     const token = jsonWebToken.sign(
//       { id: NewUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 24 * 60 * 60 * 1000,

//     });
//     console.log("Returning signup success response");
//    return res.json({ success:true,message:"Signup Successfully completed"});
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// router.post("/login", async (req, res) => {
//    console.log("Login route hit");
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.json({
//       success: false,
//       message: "username and password are required",
//     });
//   }
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.json({ success: false, message: "invalid username" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "invalid password" });
//     }
//     const token = jsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 24 * 60 * 60 * 1000
// ,
//     });
//     return res.json({ success: true ,message:"Login successfully"});
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// });

// router.post("/logout", async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge:  24 * 60 * 60 * 1000,
//     });
//     return res.json({ success: true, message: "Logged Out" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// });

// // verify
// router.get("/verify", (req, res) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.json({ loggedIn: false });
//   }

//   try {
//     const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
//     return res.json({ loggedIn: true, user: decoded }); // optionally return user info
//   } catch (error) {
//     return res.json({ loggedIn: false });
//   }
// });

// module.exports = router


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../model/user/user");

// Helper: consistent cookie settings for dev & prod
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "None", // allow cross-origin in dev too
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

// REGISTER
router.post("/register", async (req, res) => {
  console.log("Register route hit");
  const { email, username, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, getCookieOptions());
    console.log("Signup successful, token cookie set");

    return res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  console.log("Login route hit");
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, getCookieOptions());
    console.log("Login successful, token cookie set");

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", getCookieOptions());
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// VERIFY LOGIN STATUS
router.get("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true, user: decoded });
  } catch (error) {
    return res.json({ loggedIn: false });
  }
});

module.exports = router;
