import { Link } from "react-router-dom";
import Container from "../components/Container";
import HeroText from "../components/HeroText";

export default function RoleSelection() {
  return (
    <Container>
      <HeroText className="">Who am I?</HeroText>

      <div className="space-y-8">
        <Link
          to="/discover"
          className="block w-fit mx-auto bg-blue-100 border border-blue-500 text-blue-700 font-medium py-3 px-4 text-center rounded-lg hover:bg-blue-200 transition"
        >
          Student / Parent
        </Link>

        <Link
          to="/signin"
          className="block w-fit mx-auto bg-green-100 border border-green-500 text-green-700 font-medium py-3 px-4 text-center rounded-lg hover:bg-green-200 transition"
        >
          Teacher
        </Link>
      </div>
    </Container>
  );
}
