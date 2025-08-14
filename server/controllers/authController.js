const { db } = require("../firebase/firebaseAdmin");
const sendOTPEmail = require("../utils/sendOTPEmail");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 🚀 SIGNUP — Send OTP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  const existingUser = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (!existingUser.empty)
    return res
      .status(409)
      .json({ success: false, message: "Email already registered" });

  const otp = generateOTP();

  await db
    .collection("otp_verifications")
    .doc(email)
    .set({
      name,
      email,
      password,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

  await sendOTPEmail(email, otp);

  res.status(200).json({ success: true, message: "OTP sent to email", email });
};

// ✅ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const docRef = db.collection("otp_verifications").doc(email);
  const snapshot = await docRef.get();

  if (!snapshot.exists)
    return res
      .status(404)
      .json({ success: false, message: "No OTP request found" });

  const data = snapshot.data();

  if (Date.now() > data.expiresAt)
    return res.status(410).json({ success: false, message: "OTP expired" });

  if (data.otp !== otp)
    return res.status(400).json({ success: false, message: "Invalid OTP" });

  await db.collection("users").add({
    name: data.name,
    email: data.email,
    password: data.password,
    createdAt: Date.now(),
  });

  await docRef.delete();

  res
    .status(200)
    .json({ success: true, message: "OTP verified. Signup complete." });
};


// 🔁 RESEND OTP
exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  try {
    const docRef = db.collection("otp_verifications").doc(email);
    const snapshot = await docRef.get();

    if (!snapshot.exists)
      return res
        .status(404)
        .json({ success: false, message: "No OTP request found. Please sign up again." });

    const data = snapshot.data();

    const otp = generateOTP();

    await docRef.update({
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOTPEmail(email, otp);

    res.status(200).json({ success: true, message: "OTP resent to your email." });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
};



// 🔐 SIGNIN
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty)
    return res.status(404).json({ success: false, message: "User not found" });

  const user = snapshot.docs[0].data();

  if (user.password !== password)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  res.status(200).json({ success: true, message: "Signin successful" });
};
