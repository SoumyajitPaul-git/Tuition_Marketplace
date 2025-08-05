import { useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    const email = localStorage.getItem("otp_email");
    if (!email) return alert("Email not found. Try signing up again.");

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/otp/verify", { email, otp });
      alert(res.data.message);
      localStorage.removeItem("otp_email");
      navigate("/profile/basic");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="text-lg font-semibold mb-4">OTP Verification</h2>
      <p className="mb-2">Enter the OTP sent to your email.</p>
      <Input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        className="mt-4"
        onClick={handleVerify}
        disabled={loading || otp.length !== 6}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </Container>
  );
}
