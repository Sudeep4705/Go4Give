const express = require("express");
const router = express.Router()
const Support = require("../model/orphanage/support");
const authenticateUser = require("../middleware/auth");

// support
router.post("/add",authenticateUser, async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const support = new Support({
      name,
      email,
      subject,
      message,
      user: req.user.id,
    });
    await support.save();
    res.status(201).json({ message: "message submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "message not submitted" });
  }
});

//support info
router.get("/show", async (req, res) => {
  let data = await Support.find({}).populate("user");
  res.json(data);
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;
  let updated = await Support.findByIdAndUpdate(id, { status }, { new: true });

  res.json(updated);
});


module.exports = router; 