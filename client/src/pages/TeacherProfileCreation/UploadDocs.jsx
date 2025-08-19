import { useState } from "react";
import Button from "../../components/Button";
import FileUploadArea from "../../components/FileUploadArea";

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

  const [visibleSections, setVisibleSections] = useState({
    additionalMarksheets: false,
    professionalCertificates: false,
    vocationalCertificates: false,
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

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

    // ✅ Auto-toggle visibility if optional section is being uploaded
    if (
      fieldName === "additionalMarksheets" ||
      fieldName === "professionalCertificates" ||
      fieldName === "vocationalCertificates"
    ) {
      setVisibleSections((prev) => ({ ...prev, [fieldName]: true }));
    }

    // Simulate upload progress (replace with actual upload logic)
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

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

    // ✅ Auto-toggle visibility for multiple upload sections
    if (
      fieldName === "additionalMarksheets" ||
      fieldName === "professionalCertificates" ||
      fieldName === "vocationalCertificates"
    ) {
      setVisibleSections((prev) => ({ ...prev, [fieldName]: true }));
    }

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
            id: Date.now() + Math.random(),
          },
        ],
      }));
    }
  };

  const removeFile = (fieldName, fileId = null) => {
    if (fileId) {
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: prev[fieldName].filter((file) => file.id !== fileId),
      }));
    } else {
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const handleSave = () => {
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

  return (
    <div className="space-y-6">
      <FileUploadArea
        fieldName="profileImage"
        label="Upload Profile Image"
        accept="image/*"
        required={true}
        uploadedFiles={uploadedFiles}
        errors={errors}
        uploadProgress={uploadProgress}
        handleFileUpload={handleFileUpload}
        handleMultipleFileUpload={handleMultipleFileUpload}
        removeFile={removeFile}
        formatFileSize={formatFileSize}
      />

      <FileUploadArea
        fieldName="secondaryMarksheet"
        label="Upload Secondary Mark-sheet"
        accept="application/pdf,image/*"
        required={true}
        uploadedFiles={uploadedFiles}
        errors={errors}
        uploadProgress={uploadProgress}
        handleFileUpload={handleFileUpload}
        handleMultipleFileUpload={handleMultipleFileUpload}
        removeFile={removeFile}
        formatFileSize={formatFileSize}
      />

      <FileUploadArea
        fieldName="higherSecondaryMarksheet"
        label="Upload Higher Secondary Mark-sheet"
        accept="application/pdf,image/*"
        uploadedFiles={uploadedFiles}
        errors={errors}
        uploadProgress={uploadProgress}
        handleFileUpload={handleFileUpload}
        handleMultipleFileUpload={handleMultipleFileUpload}
        removeFile={removeFile}
        formatFileSize={formatFileSize}
      />

      {visibleSections.additionalMarksheets && (
        <FileUploadArea
          fieldName="additionalMarksheets"
          label="Additional Mark-sheets"
          accept="application/pdf,image/*"
          multiple={true}
          uploadedFiles={uploadedFiles}
          errors={errors}
          uploadProgress={uploadProgress}
          handleFileUpload={handleFileUpload}
          handleMultipleFileUpload={handleMultipleFileUpload}
          removeFile={removeFile}
          formatFileSize={formatFileSize}
        />
      )}

      {visibleSections.professionalCertificates && (
        <FileUploadArea
          fieldName="professionalCertificates"
          label="Professional Certificates"
          accept="application/pdf,image/*"
          multiple={true}
          uploadedFiles={uploadedFiles}
          errors={errors}
          uploadProgress={uploadProgress}
          handleFileUpload={handleFileUpload}
          handleMultipleFileUpload={handleMultipleFileUpload}
          removeFile={removeFile}
          formatFileSize={formatFileSize}
        />
      )}

      {visibleSections.vocationalCertificates && (
        <FileUploadArea
          fieldName="vocationalCertificates"
          label="Vocational Certificates"
          accept="application/pdf,image/*"
          multiple={true}
          uploadedFiles={uploadedFiles}
          errors={errors}
          uploadProgress={uploadProgress}
          handleFileUpload={handleFileUpload}
          handleMultipleFileUpload={handleMultipleFileUpload}
          removeFile={removeFile}
          formatFileSize={formatFileSize}
        />
      )}

      <div className="space-y-3 border-t pt-4">
        <button
          onClick={() =>
            setVisibleSections((prev) => ({
              ...prev,
              additionalMarksheets: true,
            }))
          }
          className="flex items-center text-[#42D4BC] hover:text-[#35b4a6] font-medium transition-colors"
        >
          <span className="text-xl mr-2">+</span> Add Mark-sheet
        </button>

        <button
          onClick={() =>
            setVisibleSections((prev) => ({
              ...prev,
              professionalCertificates: true,
            }))
          }
          className="flex items-center text-[#42D4BC] hover:text-[#35b4a6] font-medium transition-colors"
        >
          <span className="text-xl mr-2">+</span> Add Professional Certificates
        </button>

        <button
          onClick={() =>
            setVisibleSections((prev) => ({
              ...prev,
              vocationalCertificates: true,
            }))
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
