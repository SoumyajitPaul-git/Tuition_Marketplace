const express = require("express");
const {
  signup,
  signin,
  verifyOTP,
  resendOTP,
} = require("../controllers/authController");
 

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/otp/verify", verifyOTP);
router.post("/otp/resend", resendOTP);

module.exports = router;
