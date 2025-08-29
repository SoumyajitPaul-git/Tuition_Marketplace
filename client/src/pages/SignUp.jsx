import { useState, useEffect } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import HeroText from "../components/HeroText";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role"); // "student" or "teacher"
  const redirect = params.get("redirect"); // preserve redirect if any

  const validators = {
    name: (val) =>
      /^[A-Za-z\s]{3,}$/.test(val) ? "" : "Enter a valid name (min 3 letters)",
    email: (val) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Enter a valid email",
    password: (val) =>
      /^.{6,}$/.test(val) ? "" : "Password must be at least 6 characters",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const allValid = Object.keys(validators).every(
      (key) => validators[key](form[key]) === ""
    );
    setIsValid(allValid);
  }, [form]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/auth/signup", { ...form, role });
      alert(res.data.message);

      // Save email + role for OTP step
      localStorage.setItem("otp_email", form.email);
      localStorage.setItem("otp_role", role);
      if (redirect) localStorage.setItem("post_signup_redirect", redirect);

      navigate("/otp");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container>
      <HeroText>Create new account</HeroText>
      <p className="text-center text-gray-600 mb-6">
        Please fill the form to continue
      </p>

      <Input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        validator={validators.name}
      />
      <Input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        validator={validators.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        validator={validators.password}
      />

      <Button disabled={!isValid} onClick={handleSubmit}>
        Sign Up
      </Button>

      <p className="text-sm mt-4 text-center">
        Already have an Account?{" "}
        <Link
          to={`/signin?role=${role}${redirect ? `&redirect=${redirect}` : ""}`}
          className="text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </Container>
  );
}
