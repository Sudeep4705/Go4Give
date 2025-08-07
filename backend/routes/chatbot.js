const express = require("express");
const router = express.Router();


// Go4Give knowledge base
const knowledgeBase = [
  {
    q: ["how to donate", "how can i donate", "donation process"],
    a: "To donate, sign up or log in, choose an orphanage or fundraiser, enter the amount, and pay securely. You'll get a confirmation email."
  },
  {
    q: ["is my donation safe", "secure payment", "safe"],
    a: "Yes. Go4Give uses secure payment systems and works only with approved orphanages."
  },
  {
    q: ["can i track my donation", "view my donation history", "where my money went"],
    a: "Yes. You can track all past donations in your account dashboard."
  },
  {
    q: ["can i donate without account", "donate without signup"],
    a: "No. You must create an account so we can keep records and send confirmations."
  },
  {
    q: ["refund", "get my money back", "cancel donation"],
    a: "Refunds are issued only in rare cases of transaction errors, subject to admin approval."
  },
  {
    q: ["fundraiser rules", "fundraiser policy"],
    a: "Only registered and verified orphanages can post fundraisers. All details must be truthful, and funds must be used for the stated purpose."
  },
  {
    q: ["donor rules", "donor policy"],
    a: "Donors must use the official Go4Give platform, provide accurate info, and follow platform terms."
  }
];

// Simple search function
function findAnswer(userMsg) {
  const msg = userMsg.toLowerCase();
  for (const item of knowledgeBase) {
    if (item.q.some(q => msg.includes(q))) {
      return item.a;
    }
  }
  return "Sorry, I don't have an answer for that. Please contact support via the support form.";
}

router.post("/message", (req, res) => {
  const userMessage = req.body.message || "";
  const reply = findAnswer(userMessage);
  res.json({ reply });
});

module.exports = router;