const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

async function sendEmailOTP(to, otp) {
  const mailOptions = {
    from: `"MyTuition" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmailOTP;
