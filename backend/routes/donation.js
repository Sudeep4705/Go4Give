const express = require("express");
const router = express.Router()
const authenticateUser = require("../middleware/auth");
const instance = require("../razorpay");
const Donation = require("../model/donation/donor.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { cloudinary } = require("../cloudConfig.js");
// payment for orphanage by donor
router.post("/donate/:id", authenticateUser, async (req, res) => {
  try {
    const { donorName, email, phone, donationAmount } = req.body;
    // 1. Create order with Razorpay
    const options = {
      amount: donationAmount * 100, // amount in paise
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    // 2. Save donor info with orderId and status
    const donation = new Donation({
      donorName,
      email,
      phone,
      donationAmount,
      orderId: order.id,
      status: "pending",
      orphanageName: req.params.id,
    });
    await donation.save();

    // 3. Send order details to frontend
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_API_ID, // send your Razorpay key ID
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// donor donation verify
router.post("/verifypayment", authenticateUser, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    // 1. Create expected signature using your Razorpay Key Secret
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET); //Hash-based Message Authentication Code.

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    console.log("Generated signature:", generated_signature);
    console.log("Received signature:", razorpay_signature);
    // 2. Compare signatures
    if (generated_signature === razorpay_signature) {
      // Payment is authentic → update donor record
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: "Success",
        }
      );

      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      // Signature mismatch → mark as failed
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "Failed" }
      );

      return res.json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// donarslist
router.get("/donorslist", async (req, res) => {
  let data = await Donation.find({}).populate("orphanageName");
  res.json(data);
});

// sendemail to donor
// router.post("/sendreceipt", async (req, res) => {
//   const { donorName, email, donationAmount, orderId } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "go4give2002@gmail.com", // your Gmail
//         pass: "exoj ewqp ycve okun", // create router Password (not your Gmail password)
//       },
//     });

//     const mailOptions = {
//       from: "go4give2002@gmail.com",
//       to: email,
//       subject: "Donation Receipt",
//       html: `
//   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
//     <div style="text-align: center;">
//       <h1>Go4Give</h1>
//       <h2 style="color: #333;">Thank You for Your Generous Donation!</h2>
//     </div>
//     <p style="font-size: 16px; color: #555;">
//       Dear <strong>${donorName}</strong>,
//     </p>
//     <p style="font-size: 16px; color: #555;">
//       We’ve received your donation of <strong style="color: #2b7a2b;">₹${donationAmount}</strong>.  
//       Your contribution means the world to us and will help us continue our mission.
//     </p>
//     <div style="background: #ffffff; padding: 15px; border-radius: 5px; margin-top: 10px; border: 1px solid #ddd;">
//       <p style="margin: 0; font-size: 14px; color: #333;">
//         <strong>Order ID:</strong> ${orderId}
//       </p>
//       <p style="margin: 0; font-size: 14px; color: #333;">
//         <strong>Date:</strong> ${new Date().toLocaleString()}
//       </p>
//     </div>
//     <p style="margin-top: 20px; font-size: 14px; color: #777;">
//       If you have any questions, feel free to reply to this email.  
//       Thank you again for your incredible support!
//     </p>
//     <p style="text-align: center; margin-top: 20px;">
      
//     </p>
//   </div>
// `,
//     };
//     await transporter.sendMail(mailOptions);
//     res.json({ success: true, message: "Receipt sent successfully" });
//   } catch (error) {
//     console.error("Email send error:", error);
//     res.status(500).json({ success: false, message: "Failed to send receipt" });
//   }
// });

function generateCertificateHTML(donorName, donationAmount, orderId) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Arial', sans-serif;
                width: 1200px;
                height: 800px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                border: 8px solid #ff5a00;
                box-sizing: border-box;
                position: relative;
            }
            .inner-border {
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 20px;
                border: 2px solid #dee2e6;
                border-radius: 10px;
            }
            .decorative-corners {
                position: absolute;
                width: 50px;
                height: 50px;
                border: 3px solid #ff5a00;
            }
            .corner-tl { top: 40px; left: 40px; border-right: none; border-bottom: none; }
            .corner-tr { top: 40px; right: 40px; border-left: none; border-bottom: none; }
            .corner-bl { bottom: 40px; left: 40px; border-right: none; border-top: none; }
            .corner-br { bottom: 40px; right: 40px; border-left: none; border-top: none; }
            .header { color: #ff5a00; font-size: 52px; font-weight: bold; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); letter-spacing: 2px; }
            .title { color: #333; font-size: 38px; font-weight: bold; margin-bottom: 25px; letter-spacing: 1px; }
            .decorative-line { width: 600px; height: 4px; background: linear-gradient(90deg, transparent, #ff5a00, transparent); margin: 0 auto 35px auto; border-radius: 2px; }
            .certificate-content { max-width: 800px; padding: 0 40px; }
            .text { color: #555; font-size: 26px; margin: 12px 0; font-weight: 300; }
            .donor-name { color: #2b7a2b; font-size: 46px; font-weight: bold; margin: 25px 0; text-shadow: 1px 1px 3px rgba(0,0,0,0.1); border-bottom: 2px solid #2b7a2b; padding-bottom: 10px; display: inline-block; }
            .amount { color: #ff5a00; font-size: 40px; font-weight: bold; margin: 25px 0; background: linear-gradient(45deg, #ff5a00, #ff7a30); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            .mission-text { color: #555; font-size: 20px; margin: 25px 0 40px 0; line-height: 1.6; font-style: italic; max-width: 700px; margin-left: auto; margin-right: auto; }
            .footer-info { position: absolute; bottom: 60px; left: 80px; right: 80px; display: flex; justify-content: space-between; color: #666; font-size: 18px; font-weight: 500; }
            .thank-you { position: absolute; bottom: 100px; width: 100%; text-align: center; color: #2b7a2b; font-size: 20px; font-weight: 600; font-style: italic; }
            .seal { position: absolute; bottom: 120px; right: 100px; width: 80px; height: 80px; border: 4px solid #ff5a00; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255, 90, 0, 0.1); font-size: 12px; color: #ff5a00; font-weight: bold; text-align: center; line-height: 1.2; }
        </style>
    </head>
    <body>
        <div class="inner-border"></div>
        <div class="decorative-corners corner-tl"></div>
        <div class="decorative-corners corner-tr"></div>
        <div class="decorative-corners corner-bl"></div>
        <div class="decorative-corners corner-br"></div>

        <div class="header">Go4Give</div>
        <div class="title">CERTIFICATE OF APPRECIATION</div>
        <div class="decorative-line"></div>

        <div class="certificate-content">
            <div class="text">This is to certify that</div>
            <div class="donor-name">${donorName}</div>
            <div class="text">has generously donated</div>
            <div class="amount">₹${donationAmount}</div>
            <div class="mission-text">
                to support our mission of making a positive impact in the community.<br>
                Your kindness and generosity make a real difference in the lives of those we serve.
            </div>
        </div>

        <div class="thank-you">Thank you for your incredible generosity!</div>

        <div class="seal">GO4GIVE<br>VERIFIED</div>

        <div class="footer-info">
            <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div><strong>Certificate ID:</strong> ${orderId}</div>
        </div>
    </body>
    </html>
  `;
}

/* ------------------------------------------------
   2.  Certificate generator using PDFShift
   ------------------------------------------------ */
async function generateCertificate(donorName, donationAmount, orderId) {
  const html = generateCertificateHTML(donorName, donationAmount, orderId);

  try {
    const { data } = await axios.post(
      'https://api.pdfshift.io/v3/convert/png',
      {
        source: html,
        width: 1200,
        format: 'png',
        delay: 2000,
        scale: 2
      },
      {
        auth: { username: 'api', password: process.env.PDFSHIFT_API_KEY },
        responseType: 'arraybuffer'
      }
    );
    return Buffer.from(data);          // PNG buffer, same as before
  } catch (err) {
    console.error('PDFShift error:', err.response?.data || err.message);
    throw err;
  }
}

/* ------------------------------------------------
   3./sendreceipt route 
   ------------------------------------------------ */
router.post("/sendreceipt", async (req, res) => {
  const { donorName, email, donationAmount, orderId } = req.body;

  try {
    if (!donorName || !email || !donationAmount || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: donorName, email, donationAmount, orderId"
      });
    }

    console.log(`Processing receipt for ${donorName}, Order: ${orderId}`);

    // 1. Generate PNG certificate via PDFShift
    console.log('Step 1: Generating certificate');
    const certificateBuffer = await generateCertificate(donorName, donationAmount, orderId);

    // 2. Upload to Cloudinary
    console.log('Step 2: Uploading');
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'go4give/certificates',
          public_id: `donation_${orderId}_${Date.now()}`,
          format: 'png',
          quality: 'auto:best'
        },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(certificateBuffer);
    });

    // 3. Configure nodemailer (kept exactly as you had)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "go4give2002@gmail.com",
        pass: "exoj ewqp ycve okun",
      },
    });

    const mailOptions = {
      from: "go4give2002@gmail.com",
      to: email,
      subject: "Donation Receipt & Certificate - Go4Give",
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #ff5a00, #ff7a30); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 36px; font-weight: bold;">Go4Give</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Making a Difference Together</p>
          </div>

          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0; text-align: center;">Thank You for Your Generous Donation! </h2>

            <p style="font-size: 18px; color: #555; line-height: 1.6;">
              Dear <strong style="color: #2b7a2b;">${donorName}</strong>,
            </p>

            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              We are incredibly grateful for your generous donation of <strong style="color: #ff5a00; font-size: 20px;">₹${donationAmount}</strong>. 
              Your contribution will make a real difference.
            </p>

            <div style="background: #ffffff; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #ff5a00; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="margin-top: 0; color: #333; font-size: 18px;">Receipt Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Order ID:</td>
                  <td style="padding: 8px 0; color: #333;">${orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Amount:</td>
                  <td style="padding: 8px 0; color: #ff5a00; font-weight: bold;">₹${donationAmount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Date:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Donor:</td>
                  <td style="padding: 8px 0; color: #333;">${donorName}</td>
                </tr>
              </table>
            </div>

            <div style="background: linear-gradient(135deg, #e8f5e8, #f0f8f0); padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid #2b7a2b; text-align: center;">
              <h3 style="margin-top: 0; color: #2b7a2b; font-size: 22px;">Certificate of Appreciation</h3>
              <p style="margin: 15px 0; font-size: 16px; color: #555; line-height: 1.6;">
                We've prepared a beautiful certificate to commemorate your generous contribution. 
                This certificate serves as a token of our appreciation and can be saved for your records.
              </p>
            </div>

            <p style="margin-top: 30px; font-size: 16px; color: #666; line-height: 1.6;">
              If you have any questions about your donation or would like to learn more about our work, 
              please don't hesitate to reply to this email.
            </p>

            <p style="margin-top: 20px; font-size: 16px; color: #333; font-weight: bold;">
              Thank you once again for your incredible support! 
            </p>
          </div>

          <div style="background: #333; color: #ccc; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">This email was sent from <strong style="color: #ff5a00;">Go4Give</strong></p>
            <p style="margin: 10px 0 0 0;">Please keep this receipt and certificate for your records.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Go4Give_Certificate_${orderId}.png`,
          content: certificateBuffer,
          contentType: 'image/png'
        }
      ]
    };

    console.log('Step 4: Sending email...');
    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: "Receipt and certificate sent successfully",
      data: {
        certificateUrl: uploadResult.secure_url,
        orderId,
        donorName,
        amount: donationAmount,
        email,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Error in sendreceipt route:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send receipt and certificate",
      error: error.message,
      orderId: orderId || 'unknown'
    });
  }
});

router.get("/delete/:id",async(req,res)=>{
  let {id} = req.params;
 await Donation.findByIdAndDelete(id)
 res.json({message:"Donor deleted"});
})
module.exports = router; 