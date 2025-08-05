import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";

export default function GetStarted() {
  return (
    // vertically center the container
    <Container className="">
      <div className="w-full h-64 bg-gray-200 rounded-md mb-6 flex items-center justify-center">
        {/* Placeholder for Get Started image */}
        <span className="text-gray-500">[ Get Started Image ]</span>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6 text-red-300">
        Get Started
      </h1>

      <Link to="/role">
        <Button>Get Started</Button>
      </Link>
    </Container>
  );
}
