require("dotenv").config(); // Loads .env into process.env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); //read and write the cookie
const adminsRoute = require("./routes/admin");
const usersRoute = require("./routes/user");
const orphanageRoute = require("./routes/orphanage.js");
const reviewsRoute = require("./routes/reviews.js");
const supportRoute = require("./routes/support.js");
const fundraiserRoute = require("./routes/fundraiser.js");
const donationRoute = require("./routes/donation.js");
const chatRoutes = require("./routes/chatbot.js");
const report = require("./routes/report.js")
const app = express();
const url = process.env.MONGO_URL;

// Connect to MongoDB
async function main() {
  await mongoose.connect(url);
}
main()
  .then(() => {
    console.log("database created");
  })
  .catch((error) => {
    console.log("DB connection error:", error);
  });

// Middleware
app.use(cookieParser());
app.use(cors({ 
  origin:"https://go4give.netlify.app", credentials: true 
}));
// These parsers are safe for non-multipart routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get("/", (req, res) => {
  res.send("server is working");
});
app.use("/admin", adminsRoute);
app.use("/user", usersRoute);
app.use("/listing", orphanageRoute);
app.use("/reviews", reviewsRoute);
app.use("/query", supportRoute);
//fundraiser uses multer for file upload
app.use("/fundraiser", fundraiserRoute);
// donation
app.use("/donation", donationRoute);
// chatbot
app.use("/api/chat", chatRoutes);
// report
app.use("/report",report)
// Start server
app.listen(8000, () => {
  console.log("server is listening");
});
