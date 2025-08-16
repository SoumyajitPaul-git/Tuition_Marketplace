import { useState } from "react";
import Button from "../../components/Button";

export default function UploadDocs({ onSave, initialData = {} }) {
  const [uploadedFiles, setUploadedFiles] = useState({
    profileImage: initialData.profileImage || null,
    secondaryMarksheet: initialData.secondaryMarksheet || null,
    higherSecondaryMarksheet: initialData.higherSecondaryMarksheet || null,
    additionalMarksheets: initialData.additionalMarksheets || [],
    professionalCertificates: initialData.professionalCertificates || [],
    vocationalCertificates: initialData.vocationalCertificates || [],
    ...initialData,
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});

  const handleFileUpload = async (fieldName, file) => {
    if (!file) return;

    // Validate file type and size
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Only JPEG, PNG, and PDF files are allowed",
      }));
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "File size must be less than 5MB",
      }));
      return;
    }

    // Clear previous errors
    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));

    // Simulate upload progress (replace with actual upload logic)
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadProgress((prev) => ({ ...prev, [fieldName]: i }));
    }

    // Update uploaded files
    setUploadedFiles((prev) => ({
      ...prev,
      [fieldName]: {
        file,
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      },
    }));

    setUploadProgress((prev) => ({ ...prev, [fieldName]: null }));
  };

  const handleMultipleFileUpload = async (fieldName, files) => {
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      await handleFileUpload(`${fieldName}_temp`, file);

      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: [
          ...prev[fieldName],
          {
            file,
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            id: Date.now() + Math.random(), // Simple ID generation
          },
        ],
      }));
    }
  };

  const removeFile = (fieldName, fileId = null) => {
    if (fileId) {
      // Remove from array
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: prev[fieldName].filter((file) => file.id !== fileId),
      }));
    } else {
      // Remove single file
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const handleSave = () => {
    // Validate required uploads if needed
    const requiredFields = ["profileImage", "secondaryMarksheet"];
    const missingFields = requiredFields.filter(
      (field) => !uploadedFiles[field]
    );

    if (missingFields.length > 0) {
      const newErrors = {};
      missingFields.forEach((field) => {
        newErrors[field] = "This document is required";
      });
      setErrors(newErrors);
      return;
    }

    // Call parent's save function
    if (onSave) {
      onSave(uploadedFiles);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const FileUploadArea = ({
    fieldName,
    label,
    accept = "image/*,application/pdf",
    required = false,
    multiple = false,
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#42D4BC] transition-colors">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            const files = e.target.files;
            if (files.length > 0) {
              if (multiple) {
                handleMultipleFileUpload(fieldName, files);
              } else {
                handleFileUpload(fieldName, files[0]);
              }
            }
          }}
          className="hidden"
          id={fieldName}
        />

        <label
          htmlFor={fieldName}
          className="cursor-pointer flex flex-col items-center"
        >
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-gray-600">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-gray-500 mt-1">
            PDF, JPEG, PNG (Max 5MB)
          </span>
        </label>

        {uploadProgress[fieldName] !== null &&
          uploadProgress[fieldName] !== undefined && (
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#42D4BC] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress[fieldName]}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                Uploading... {uploadProgress[fieldName]}%
              </span>
            </div>
          )}
      </div>

      {errors[fieldName] && (
        <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>
      )}

      {/* Display uploaded file(s) */}
      {uploadedFiles[fieldName] && !Array.isArray(uploadedFiles[fieldName]) && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {uploadedFiles[fieldName].name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(uploadedFiles[fieldName].size)}
              </p>
            </div>
          </div>
          <button
            onClick={() => removeFile(fieldName)}
            className="text-red-600 hover:text-red-800"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
      )}

      {/* Display multiple uploaded files */}
      {Array.isArray(uploadedFiles[fieldName]) &&
        uploadedFiles[fieldName].length > 0 && (
          <div className="mt-3 space-y-2">
            {uploadedFiles[fieldName].map((file) => (
              <div
                key={file.id}
                className="p-3 bg-green-50 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(fieldName, file.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
    </div>
  );

  return (
    <div className="space-y-6">
      <FileUploadArea
        fieldName="profileImage"
        label="Upload Profile Image"
        accept="image/*"
        required={true}
      />

      <FileUploadArea
        fieldName="secondaryMarksheet"
        label="Upload Secondary Mark-sheet"
        accept="application/pdf,image/*"
        required={true}
      />

      <FileUploadArea
        fieldName="higherSecondaryMarksheet"
        label="Upload Higher Secondary Mark-sheet"
        accept="application/pdf,image/*"
      />

      {/* <FileUploadArea
        fieldName="additionalMarksheets"
        label="Additional Mark-sheets"
        accept="application/pdf,image/*"
        multiple={true}
      /> */}

      {/* <FileUploadArea
        fieldName="professionalCertificates"
        label="Professional Certificates"
        accept="application/pdf,image/*"
        multiple={true}
      /> */}

      {/* <FileUploadArea
        fieldName="vocationalCertificates"
        label="Vocational Certificates"
        accept="application/pdf,image/*"
        multiple={true}
      /> */}

      {/* Add more buttons */}
      <div className="space-y-3 border-t pt-4">
        <button
          onClick={() =>
            document.getElementById("additionalMarksheets").click()
          }
          className="flex items-center text-[#42D4BC] hover:text-[#35b4a6] font-medium transition-colors"
        >
          <span className="text-xl mr-2">+</span> Add Mark-sheet
        </button>

        <button
          onClick={() =>
            document.getElementById("professionalCertificates").click()
          }
          className="flex items-center text-[#42D4BC] hover:text-[#35b4a6] font-medium transition-colors"
        >
          <span className="text-xl mr-2">+</span> Add Professional Certificates
        </button>

        <button
          onClick={() =>
            document.getElementById("vocationalCertificates").click()
          }
          className="flex items-center text-[#42D4BC] hover:text-[#35b4a6] font-medium transition-colors"
        >
          <span className="text-xl mr-2">+</span> Add Vocational Certificates
        </button>
      </div>

      <Button onClick={handleSave} className="px-4 mt-6 text-md">
        Save
      </Button>
    </div>
  );
}
