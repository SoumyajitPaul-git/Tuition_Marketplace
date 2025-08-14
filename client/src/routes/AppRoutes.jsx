import { Routes, Route } from "react-router-dom";
import GetStarted from "../pages/GetStarted";
import RoleSelection from "../pages/RoleSelection";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import OTPVerification from "../pages/OTPVerification";
import BasicInfo from "../pages/TeacherProfileCreation/BasicInfo";
import Discover from "../pages/Discover";
import ProfileCreation from "../pages/TeacherProfileCreation/ProfileCreation";
// import WelcomeTeacher from "../pages/WelcomeTeacher";
// import WelcomeParent from "../pages/WelcomeParent";
// import StepBasic from "../pages/ProfileCreation/StepBasic";
// import StepSubject from "../pages/ProfileCreation/StepSubject";
// import StepQualification from "../pages/ProfileCreation/StepQualification";
// import StepSummary from "../pages/ProfileCreation/StepSummary";
// import StepReview from "../pages/ProfileCreation/StepReview";
// import DeliveryConfirmation from "../pages/DeliveryConfirmation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/role" element={<RoleSelection />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<OTPVerification />} />
      {/* <Route path="/profile/basic" element={<BasicInfo />} /> */}
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile/creation" element={<ProfileCreation />} />
      {/* <Route path="/welcome-teacher" element={<WelcomeTeacher />} />
      <Route path="/welcome-parent" element={<WelcomeParent />} />
      <Route path="/profile/basic" element={<StepBasic />} />
      <Route path="/profile/subject" element={<StepSubject />} />
      <Route path="/profile/qualification" element={<StepQualification />} />
      <Route path="/profile/summary" element={<StepSummary />} />
      <Route path="/profile/review" element={<StepReview />} />
      <Route path="/delivery" element={<DeliveryConfirmation />} /> */}
    </Routes>
  );
}
