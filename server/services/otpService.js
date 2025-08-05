const { db } = require("../firebase/firebaseConfig");
const generateOTP = require("../utils/generateOTP");

const sendOTP = async (phone) => {
  const otp = generateOTP();
  await db.ref(`otp/${phone}`).set({
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
  });
  console.log(`OTP for ${phone}: ${otp}`); // Simulate SMS
  return otp;
};

const verifyOTP = async (phone, inputOtp) => {
  const otpRef = db.ref(`otp/${phone}`);
  const snapshot = await otpRef.once("value");
  const data = snapshot.val();

  if (!data) return { success: false, message: "No OTP found" };

  if (Date.now() > data.expiresAt) {
    return { success: false, message: "OTP expired" };
  }

  if (data.otp !== inputOtp) {
    return { success: false, message: "Invalid OTP" };
  }

  // Optional: delete OTP after use
  await otpRef.remove();

  return { success: true };
};

module.exports = { sendOTP, verifyOTP };
