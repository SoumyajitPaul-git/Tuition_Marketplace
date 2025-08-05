const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use 'smtp.ethereal.email' for testing
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"My Tuition App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Verification Code",
    text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
