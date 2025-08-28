const { db } = require("../firebase/firebaseAdmin");
const sendOTPEmail = require("../utils/sendOTPEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


// Example: add "role" in req.body ("teacher" or "student")
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  // Choose collection based on role
  const collection = role === "teacher" ? "teachers" : "students";

  // Check if user exists
  const existingUser = await db
    .collection(collection)
    .where("email", "==", email)
    .get();

  if (!existingUser.empty) {
    return res
      .status(409)
      .json({ success: false, message: "Email already registered" });
  }

  const otp = generateOTP();
  const hashedPassword = await bcrypt.hash(password, 10);

  await db
    .collection("otp_verifications")
    .doc(email)
    .set({
      name,
      email,
      password: hashedPassword, // store hashed password in temp collection
      role,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
    });

  await sendOTPEmail(email, otp);

  res.status(200).json({ success: true, message: "OTP sent to email", email });
};

// ✅ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const docRef = db.collection("otp_verifications").doc(email);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    return res.status(404).json({ success: false, message: "No OTP request found" });
  }

  const data = snapshot.data();

  if (Date.now() > data.expiresAt) {
    return res.status(410).json({ success: false, message: "OTP expired" });
  }

  if (data.otp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // Pick correct collection based on role
  const collection = data.role === "teacher" ? "teachers" : "students";

  const userRef = await db.collection(collection).add({
    name: data.name,
    email: data.email,
    password: data.password, // already hashed during signup
    role: data.role,
    createdAt: new Date(),
  });

  // Remove OTP record
  await docRef.delete();

  // Issue JWT
  const token = jwt.sign(
    { userId: userRef.id, email: data.email, role: data.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    message: "OTP verified. Signup complete.",
    token,
    userId: userRef.id,
    role: data.role,
  });
};


// 🔁 RESEND OTP
exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const docRef = db.collection("otp_verifications").doc(email);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "No OTP request found. Please sign up again.",
      });
    }

    const otp = generateOTP();

    await docRef.update({
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
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
  const { email, password, role } = req.body;

  if (!role) {
    return res
      .status(400)
      .json({ success: false, message: "Role is required" });
  }

  const collection = role === "teacher" ? "teachers" : "students";

  const snapshot = await db
    .collection(collection)
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const userDoc = snapshot.docs[0];
  const user = userDoc.data();

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  // Issue JWT
  const token = jwt.sign(
    { userId: userDoc.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    message: "Signin successful",
    token,
    userId: userDoc.id,
    role: user.role,
  });
};
