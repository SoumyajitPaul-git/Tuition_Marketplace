import { useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("otp_email");
  const role = localStorage.getItem("otp_role");
  const redirect = localStorage.getItem("post_signup_redirect"); // ✅ keep the protected page

  const handleVerify = async () => {
    if (!email) return alert("Email not found. Try signing up again.");
    if (otp.length !== 6) return alert("Please enter a 6-digit OTP");

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/otp/verify", { email, otp });
      alert(res.data.message);

      // cleanup
      localStorage.removeItem("otp_email");
      localStorage.removeItem("otp_role");

      // ✅ handle redirect if exists
      if (redirect) {
        localStorage.removeItem("post_signup_redirect");
        navigate(redirect, { replace: true });
        return;
      }

      // fallback: role-based redirect
      if (role === "teacher") {
        navigate("/profile/creation");
      } else if (role === "student") {
        navigate("/discover");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return alert("Email not found. Try signing up again.");

    try {
      setResending(true);
      const res = await axios.post("/api/auth/otp/resend", { email });
      alert(res.data.message || "OTP resent successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <Container>
      <h2 className="text-lg font-semibold mb-4">OTP Verification</h2>
      <p className="mb-2">Enter the OTP sent to your email.</p>
      <Input
        type="text"
        inputMode="numeric"
        autoFocus
        maxLength={6}
        pattern="\d{6}"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d{0,6}$/.test(val)) setOtp(val);
        }}
      />

      <Button
        className="mt-4"
        onClick={handleVerify}
        disabled={loading || otp.length !== 6}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>

      <button
        onClick={handleResend}
        disabled={resending}
        className="mt-4 text-sm text-primary underline hover:text-primary-dark"
      >
        {resending ? "Resending OTP..." : "Resend OTP"}
      </button>
    </Container>
  );
}
