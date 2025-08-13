import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import get_startedImage from "../assets/get_started.jpg"; // Placeholder for the image

export default function GetStarted() {
  return (
    // vertically center the container
    <Container className="">
      <div className="w-full h-128 bg-gray-200 rounded-md mb-6 flex items-center justify-center">
        {/* Placeholder for Get Started image */}
        <img src={get_startedImage} alt="Get Started" className="w-full h-full object-cover" />
      </div>

      {/* <h1 className="text-2xl font-bold text-center mb-6 text-red-300">
        Get Started
      </h1> */}

      <Link to="/role">
        <Button>Get Started</Button>
      </Link>
    </Container>
  );
}
