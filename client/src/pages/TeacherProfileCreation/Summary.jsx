import { useState } from "react";
import Button from "../../components/Button";

export default function Summary({ profileData = {}, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForValidation = async () => {
    setIsSubmitting(true);

    try {
      // Call parent's submit function or API
      if (onSubmit) {
        await onSubmit(profileData);
      }

      // Show success message or redirect
      alert("Profile submitted for validation successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get profile image URL or placeholder
  const getProfileImageUrl = () => {
    if (profileData.uploadedFiles?.profileImage?.file) {
      return URL.createObjectURL(profileData.uploadedFiles.profileImage.file);
    }
    return "https://via.placeholder.com/80x80?text=Profile";
  };

  // Get all uploaded documents
  const getAllUploadedDocs = () => {
    const docs = [];
    const { uploadedFiles } = profileData;

    if (!uploadedFiles) return docs;

    // Single file uploads
    if (uploadedFiles.profileImage) {
      docs.push({
        name: uploadedFiles.profileImage.name,
        type: "Profile Image",
        status: "uploaded",
      });
    }

    if (uploadedFiles.secondaryMarksheet) {
      docs.push({
        name: uploadedFiles.secondaryMarksheet.name,
        type: "Secondary Marksheet",
        status: "uploaded",
      });
    }

    if (uploadedFiles.higherSecondaryMarksheet) {
      docs.push({
        name: uploadedFiles.higherSecondaryMarksheet.name,
        type: "Higher Secondary Marksheet",
        status: "uploaded",
      });
    }

    // Multiple file uploads
    if (uploadedFiles.additionalMarksheets) {
      uploadedFiles.additionalMarksheets.forEach((file) => {
        docs.push({
          name: file.name,
          type: "Additional Marksheet",
          status: "uploaded",
        });
      });
    }

    if (uploadedFiles.professionalCertificates) {
      uploadedFiles.professionalCertificates.forEach((file) => {
        docs.push({
          name: file.name,
          type: "Professional Certificate",
          status: "uploaded",
        });
      });
    }

    if (uploadedFiles.vocationalCertificates) {
      uploadedFiles.vocationalCertificates.forEach((file) => {
        docs.push({
          name: file.name,
          type: "Vocational Certificate",
          status: "uploaded",
        });
      });
    }

    return docs;
  };

  const uploadedDocs = getAllUploadedDocs();

  // Get basic info with fallbacks
  const basicInfo = profileData.basicInfo || {};
  const preferenceInfo = profileData.preference || {};

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
        <div className="flex-shrink-0">
          <img
            src={getProfileImageUrl()}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80x80?text=Profile";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {basicInfo.name || "Name not provided"}
          </h3>

          {basicInfo.degree && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Degree:</span> {basicInfo.degree}
            </p>
          )}

          {basicInfo.status && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Status:</span> {basicInfo.status}
            </p>
          )}

          {basicInfo.introduction && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {basicInfo.introduction}
            </p>
          )}
        </div>
      </div>

      {/* Preference Summary */}
      {(preferenceInfo.subjects?.length > 0 ||
        preferenceInfo.areas?.length > 0 ||
        preferenceInfo.standard ||
        preferenceInfo.experience) && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">
            Teaching Preferences
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {preferenceInfo.subjects?.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">Subjects:</span>
                <p className="text-gray-600">
                  {preferenceInfo.subjects.join(", ")}
                </p>
              </div>
            )}

            {preferenceInfo.areas?.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">Areas:</span>
                <p className="text-gray-600">
                  {preferenceInfo.areas.join(", ")}
                </p>
              </div>
            )}

            {preferenceInfo.standard && (
              <div>
                <span className="font-medium text-gray-700">Standard:</span>
                <p className="text-gray-600">{preferenceInfo.standard}</p>
              </div>
            )}

            {preferenceInfo.experience && (
              <div>
                <span className="font-medium text-gray-700">Experience:</span>
                <p className="text-gray-600">{preferenceInfo.experience}</p>
              </div>
            )}
          </div>

          {(preferenceInfo.achievement || preferenceInfo.outcome) && (
            <div className="mt-4 space-y-2">
              {preferenceInfo.achievement && (
                <div>
                  <span className="font-medium text-gray-700">
                    Achievement:
                  </span>
                  <p className="text-gray-600 text-sm">
                    {preferenceInfo.achievement}
                  </p>
                </div>
              )}

              {preferenceInfo.outcome && (
                <div>
                  <span className="font-medium text-gray-700">Outcome:</span>
                  <p className="text-gray-600 text-sm">
                    {preferenceInfo.outcome}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">
            Mark-sheet / Certificates
          </h4>
          <span className="text-sm text-gray-500">
            {uploadedDocs.length} document{uploadedDocs.length !== 1 ? "s" : ""}{" "}
            uploaded
          </span>
        </div>

        {uploadedDocs.length > 0 ? (
          <div className="space-y-2">
            {uploadedDocs.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {doc.name.toLowerCase().includes(".pdf") ? (
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                      </svg>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500">{doc.type}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {doc.status === "uploaded" ? (
                    <div className="w-6 h-6 bg-[#42D4BC] rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>No documents uploaded yet</p>
            <p className="text-sm">
              Please go back to the Upload section to add documents
            </p>
          </div>
        )}
      </div>

      {/* Validation Status */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-yellow-600 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,10A1,1 0 0,1 13,11V7A1,1 0 0,1 12,6A1,1 0 0,1 11,7V11A1,1 0 0,1 12,10Z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Ready for Validation
            </p>
            <p className="text-xs text-yellow-700">
              Please review all information before submitting for validation
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmitForValidation}
          disabled={isSubmitting || uploadedDocs.length === 0}
          className={`w-full py-3 text-lg font-semibold ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "SEND FOR VALIDATION"
          )}
        </Button>

        {uploadedDocs.length === 0 && (
          <p className="text-center text-sm text-red-500 mt-2">
            Please upload at least one document before submitting
          </p>
        )}
      </div>

      {/* Additional Info */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t">
        <p>After submission, your profile will be reviewed by our team.</p>
        <p>
          You'll receive an email notification once the validation is complete.
        </p>
      </div>
    </div>
  );
}
