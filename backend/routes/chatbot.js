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
  },
  {
    q: ["hi", "hello", "hey", "good morning", "good evening"],
    a: "Hello! 👋 How can I help you today?"
  },
  {
    q: ["how are you", "how are you doing", "how’s it going"],
    a: "I’m doing great, thanks for asking! 😊 How can I assist you?"
  },
  {
    q: ["who are you", "what are you", "are you a bot"],
    a: "I’m Go4Give’s support assistant 🤖. I can help answer your questions about donations and orphanages."
  },
  {
    q: ["thank you", "thanks", "ty", "thx"],
    a: "You’re welcome! 🙏 Glad I could help."
  },
  {
    q: ["bye", "goodbye", "see you", "talk to you later"],
    a: "Goodbye! 👋 Take care and have a great day!"
  },
  {
    q: ["what is go4give", "about go4give", "tell me about go4give"],
    a: "Go4Give is a donation platform that connects donors with orphanages. You can securely donate, track donations, and support genuine causes."
  },
  {
    q: ["contact support", "help", "need help", "support"],
    a: "For support, you can email us at support@go4give.com or use the Help section in your dashboard."
  },
  {
    q: ["payment methods", "how can i pay", "available payment options"],
    a: "You can pay using credit/debit cards, UPI, net banking, or wallets supported by Razorpay."
  },
  {
    q: ["tax benefits", "donation tax", "is donation tax deductible"],
    a: "Yes, some donations may be eligible for tax benefits. You'll receive a receipt you can use for tax filing."
  },
  {
    q: ["change password", "reset password", "forgot password"],
    a: "Go to the login page and click on 'Forgot Password'. Follow the steps to reset your password securely."
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