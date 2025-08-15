import { useState, useEffect } from "react";
import HeroText from "../../components/HeroText";
import TopNavBar from "../../components/TopNavBar"; // NEW
import { FaCog } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

// Import your 4 step components
import BasicInfo from "./BasicInfo";
import Preference from "./Preference";
import UploadDocs from "./UploadDocs";
import Summary from "./Summary";

export default function ProfileCreation() {
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({
    basicInfo: {},
    preference: {},
    uploadedFiles: {},
    isComplete: false,
  });

  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      label: "Basic Info",
      component: (
        <BasicInfo
          onSave={handleBasicInfoSave}
          initialData={profileData.basicInfo}
        />
      ),
    },
    {
      label: "Preference",
      component: (
        <Preference
          onSave={handlePreferenceSave}
          initialData={profileData.preference}
        />
      ),
    },
    {
      label: "Upload",
      component: (
        <UploadDocs
          onSave={handleUploadSave}
          initialData={profileData.uploadedFiles}
        />
      ),
    },
    {
      label: "Summary",
      component: (
        <Summary profileData={profileData} onSubmit={handleFinalSubmit} />
      ),
    },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("profileCreationData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setProfileData(parsedData);

        const completed = new Set();
        if (
          parsedData.basicInfo &&
          Object.keys(parsedData.basicInfo).length > 0
        ) {
          completed.add(0);
        }
        if (
          parsedData.preference &&
          Object.keys(parsedData.preference).length > 0
        ) {
          completed.add(1);
        }
        if (
          parsedData.uploadedFiles &&
          Object.keys(parsedData.uploadedFiles).length > 0
        ) {
          completed.add(2);
        }
        setCompletedSteps(completed);
      } catch (error) {
        console.error("Error loading saved profile data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(profileData.basicInfo).length > 0 ||
      Object.keys(profileData.preference).length > 0 ||
      Object.keys(profileData.uploadedFiles).length > 0
    ) {
      localStorage.setItem("profileCreationData", JSON.stringify(profileData));
    }
  }, [profileData]);

  function handleBasicInfoSave(basicInfoData) {
    setProfileData((prev) => ({
      ...prev,
      basicInfo: basicInfoData,
    }));
    setCompletedSteps((prev) => new Set([...prev, 0]));
    if (activeStep === 0) {
      setActiveStep(1);
    }
    showSuccessMessage("Basic information saved successfully!");
  }

  function handlePreferenceSave(preferenceData) {
    setProfileData((prev) => ({
      ...prev,
      preference: preferenceData,
    }));
    setCompletedSteps((prev) => new Set([...prev, 1]));
    if (activeStep === 1) {
      setActiveStep(2);
    }
    showSuccessMessage("Preferences saved successfully!");
  }

  function handleUploadSave(uploadData) {
    setProfileData((prev) => ({
      ...prev,
      uploadedFiles: uploadData,
    }));
    setCompletedSteps((prev) => new Set([...prev, 2]));
    if (activeStep === 2) {
      setActiveStep(3);
    }
    showSuccessMessage("Documents uploaded successfully!");
  }

  async function handleFinalSubmit(finalData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setProfileData((prev) => ({
        ...prev,
        isComplete: true,
        submittedAt: new Date().toISOString(),
      }));
      setCompletedSteps((prev) => new Set([...prev, 3]));
      localStorage.removeItem("profileCreationData");
      showSuccessMessage("Profile submitted for validation successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      throw error;
    }
  }

  function showSuccessMessage(message) {
    const toast = document.createElement("div");
    toast.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md z-50";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }

  function handleStepClick(stepIndex) {
    if (stepIndex > 0 && !completedSteps.has(stepIndex - 1)) {
      const confirmSkip = window.confirm(
        `You haven't completed the previous step. Are you sure you want to continue?`
      );
      if (!confirmSkip) return;
    }
    setActiveStep(stepIndex);
  }

  function handleGoBack() {
    console.log("Go back clicked");
  }

  const completionPercentage = Math.round(
    (completedSteps.size / steps.length) * 100
  );

  return (
    <div className="min-h-screen bg-white mb-4 flex flex-col items-center">
      {/* ✅ Reusable Top Navigation Bar */}
      <TopNavBar onGoBack={handleGoBack} />

      {/* Title */}
      <HeroText className="text-3xl">
        {activeStep === 3 ? "Profile Summary" : "Profile Creation"}
      </HeroText>

      {/* Progress Info */}
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600">
          Step {activeStep + 1} of {steps.length} • {completionPercentage}%
          Complete
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center gap-2 mb-4">
        {steps.map((_, idx) => (
          <div key={idx} className="relative">
            <span
              className={`h-2 w-6 rounded-full transition-colors duration-200 block ${
                idx <= activeStep ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            {completedSteps.has(idx) && idx !== activeStep && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-2 h-2 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Buttons */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {steps.map((step, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 relative ${
              activeStep === idx
                ? "bg-[#42D4BC] text-black shadow-md"
                : completedSteps.has(idx)
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleStepClick(idx)}
          >
            {step.label}
            {completedSteps.has(idx) && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="w-full max-w-3xl  rounded-xl shadow-md p-6">
        <div className="min-h-[400px]">{steps[activeStep].component}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-3xl mt-6">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeStep === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Previous
        </button>

        {activeStep < steps.length - 1 && (
          <button
            onClick={() =>
              setActiveStep(Math.min(steps.length - 1, activeStep + 1))
            }
            className="px-6 py-2 rounded-md font-medium bg-[#42D4BC] text-black hover:bg-[#35b4a6] transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
