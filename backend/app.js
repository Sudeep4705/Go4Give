require("dotenv").config(); //it loads .env file to process.env

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = process.env.MONGO_URL;
const fundraiser = require("./model/fundraiser/fundraiser")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { storage } = require("./cloudConfig");
const multer = require("multer");
const upload = multer({ storage });
const Listing = require("./model/orphanage/orphan");
const Review = require("./model/orphanage/review");
const Support = require("./model/orphanage/support")
const authenticateUser = require("./middleware/auth");
const admins = require("./routes/admin")
const users = require("./routes/user");
const Fundraiser = require("./model/fundraiser/fundraiser");
const instance =  require('./razorpay')
const Donotion = require("./model/donation/donor.js"); 
const Donation = require("./model/donation/donor.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
  .then(() => {
    console.log("database created");
  })
  .catch((error) => {
    console.log(error);
  });

async function main() {
  await mongoose.connect(url);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/", (req, res) => {
  res.send("server is working");
});
// admin route
app.use("/admin",admins);
// user route
app.use("/user",users)





// orphnage
app.post("/add", upload.fields([
  { name: 'image', maxCount: 1 },  
  { name: 'video', maxCount: 1 },   
]), async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0]; //gets the first uploaded image
    const videoFile = req.files?.video?.[0]; //gets the first uploaded video

    if (!imageFile || !videoFile) {
      return res.status(400).json({ error: "Both image and video are required" });
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
});


// index page
app.get("/index", async (req, res) => {
  let data = await Listing.find({});
  res.json(data);
});
// show page
app.get("/show/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
let data = await Listing.findById(id);
  res.json(data);
});

// review

app.post("/reviews/:listingId", authenticateUser, async (req, res) => {
  const { comment, rating } = req.body;
  try {
    const review = new Review({
      comment,
      rating,
      user: req.user.id,
      orphan:req.params.listingId
    });
    await review.save();
    res.status(201).json({ message: "review added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Review not added" });
  }
});

// support
app.post("/support",authenticateUser,async(req,res)=>{
    const {name, email, subject, message} = req.body;
    try{
        const support = new Support({
      name,
      email,
      subject,
      message,
            user:req.user.id,
        })
        await support.save()
        res.status(201).json({message:"message submitted successfully"})
    }
    catch(err){
        res.status(500).json({message:"message not submitted"})
    }
})
// feedback
app.get("/feedback",async(req,res)=>{
  let feedback = await Review.find({}).populate("user").populate("orphan")
  res.json(feedback)
})

//support info
app.get("/query",async(req,res)=>{
  let data  = await Support.find({}).populate("user")
  res.json(data)
})



app.put("/query/:id",async(req,res)=>{
  let {id}  = req.params;
  let {status} = req.body
  let updated = await Support.findByIdAndUpdate(id,{status},{new:true})

  res.json(updated)
})


// fundraiser

  app.post("/fundraiser", upload.single('image'), async (req, res) => {
    try {
      const image = req.file;

      const funds = new fundraiser({
        ...req.body,
        currentamount: 0,              
        image: {
          url: image.path,
          filename: image.filename
        }
      });

      await funds.save();

      res.status(201).json({ message: "Fundraiser created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // show fundraiser
app.get("/fundraiser/show",async (req,res)=>{
let data  = await  Fundraiser.find({})
res.json(data)
  })


  // payment

app.post("/donate", async (req, res) => {
  try {
    const { donorName, email, phone, donationAmount } = req.body;

    // 1. Create order with Razorpay
    const options = {
      amount: donationAmount * 100, // amount in paise
      currency: "INR"
    };
    const order = await instance.orders.create(options);

    // 2. Save donor info with orderId and status
    const donation = new Donation({
      donorName,
      email,
      phone,
      donationAmount,
      orderId: order.id,
      status: "pending"
    });
    await donation.save();

    // 3. Send order details to frontend
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_API_ID // send your Razorpay key ID
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});


  // app.get("/getkey",async(req,res)=>{
  //   res.status(200).json({
  //     key:process.env.RAZORPAY_API_ID
  //   })
  // })

  app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // 1. Create expected signature using your Razorpay Key Secret
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    // 2. Compare signatures
    if (generated_signature === razorpay_signature) {
      // Payment is authentic → update donor record
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: "Success"
        }
      );

      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // Signature mismatch → mark as failed
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "Failed" }
      );

      return res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


  app.listen(8000, () => {
  console.log("server is listining");
});