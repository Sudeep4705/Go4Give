const Donation = require("../model/donation/donor.js");
const Fundraiser = require("../model/fundraiser/fundraiser.js");
const Funds = require("../model/donation/funds.js");
const express = require("express");
const router = express.Router()



// models/Donor.js, Fundraiser.js, Donation.js assumed

router.get('/all', async (req, res) => {
  try {
    const totalDonors = await Donation.countDocuments();
    const totalFundraisers = await Fundraiser.countDocuments();

    // Total donation amount
    const donationResult = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$donationAmount" } 
        }
      }
    ]);
    const totalDonationAmount = donationResult[0]?.total || 0;

   
    const fundraiserResult = await Funds.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$donationAmount" } 
        }
      }
    ]);
    const totalFundraiserAmount = fundraiserResult[0]?.total || 0;

    res.json({
      totalDonors,
      totalFundraisers,
      totalDonationAmount,
      totalFundraiserAmount 
    });
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});


module.exports = router;