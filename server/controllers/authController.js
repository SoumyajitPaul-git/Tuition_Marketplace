const { db } = require("../firebase/firebaseAdmin");
const { firestore } = require("../firebase/firebaseAdmin");
const sendOTPEmail = require("../utils/sendOTPEmail");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 👤 SIGNUP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  const usersRef = firestore.collection("users");
  const existingUser = await usersRef.where("email", "==", email).get();

  if (!existingUser.empty)
    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });

  const otp = generateOTP();

  await firestore
    .collection("otp_verifications")
    .doc(email)
    .set({
      otp,
      name,
      email,
      password,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

  await sendOTPEmail(email, otp);

  res.status(200).json({ success: true, message: "OTP sent to email", email });
};




// 🔐 OTP Verification
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const docRef = firestore.collection("otp_verifications").doc(email);
  const doc = await docRef.get();

  if (!doc.exists)
    return res.status(404).json({ success: false, message: "No OTP found" });

  const data = doc.data();

  if (Date.now() > data.expiresAt)
    return res.status(410).json({ success: false, message: "OTP expired" });

  if (data.otp !== otp)
    return res.status(400).json({ success: false, message: "Invalid OTP" });

  // Save user to main 'users' collection
  await firestore.collection("users").add({
    name: data.name,
    email: data.email,
    password: data.password,
    createdAt: Date.now(),
  });

  // Cleanup
  await docRef.delete();

  res
    .status(200)
    .json({ success: true, message: "OTP verified. Signup complete." });
};




// 🔐 SIGNIN
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Signin successful" });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
