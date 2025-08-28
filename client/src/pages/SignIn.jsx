import { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import HeroText from "../components/HeroText";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role"); // "student" or "teacher"

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/auth/signin", { ...form, role });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);

      navigate(
        res.data.role === "teacher"
          ? "/teacher/dashboard"
          : "/student/dashboard"
      );
    } catch (err) {
      alert(err.response?.data?.message || "Sign in failed");
    }
  };

  const validators = {
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

  

  return (
    <Container>
      <HeroText>Welcome Back !!</HeroText>

      <p className="text-center text-gray-600 mb-6">
        Please sign in to your account
      </p>

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

      <div className="flex justify-end text-sm mb-4">
        <Link to="/forgot" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>

      <Button onClick={handleSubmit} disabled={!isValid}>
        Sign In
      </Button>

      <p className="text-sm mt-4 text-center">
        Don’t have an Account?{" "}
        <Link to="/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </Container>
  );
}
