const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  // sendOTP,
  verifyOTP,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/otp/verify", verifyOTP);
// router.post("/otp/send", sendOTP);
// router.post("/otp/verify", verifyOTP);

module.exports = router;
 