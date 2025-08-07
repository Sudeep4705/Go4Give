const Listing = require("../model/orphanage/orphan");
const express = require("express");
const router = express.Router()
const { storage } = require("../cloudConfig");
const multer = require("multer");
const upload = multer({storage});

// orphnage
router.post("/add",upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const imageFile = req.files?.image?.[0]; //gets the first uploaded image
      const videoFile = req.files?.video?.[0]; //gets the first uploaded video

      if (!imageFile || !videoFile) {
        return res
          .status(400)
          .json({ error: "Both image and video are required" });
      }

      const listing = new Listing({
        ...req.body,
        image: {
          url: imageFile.path,
          filename: imageFile.filename,
        },
        video: {
          url: videoFile.path,
          filename: videoFile.filename,
        },
      });

      await listing.save();
      res.status(201).json({ message: "Data added successfully" });
    } catch (err) {
      console.error("Error saving listing:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// index page
router.get("/index", async (req, res) => {
  let data = await Listing.find({});
  res.json(data);
});

// show page
router.get("/show/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let data = await Listing.findById(id);
  res.json(data);
});



module.exports = router; 