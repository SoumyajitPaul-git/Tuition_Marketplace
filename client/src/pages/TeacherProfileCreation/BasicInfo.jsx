
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function BasicInfo({ onSave, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    degree: initialData.degree || "",
    status: initialData.status || "",
    introduction: initialData.introduction || "",
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  const validators = {
    name: (val) => (val.trim() === "" ? "Name is required" : ""),
    introduction: (val) =>
      val.length > 200 ? "Introduction must be under 200 characters" : "",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSave = () => {
    const newErrors = {};

    // Validate all fields
    Object.keys(validators).forEach((field) => {
      const error = validators[field](formData[field] || "");
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call parent's save function
    if (onSave) {
      onSave(formData);
    }
  };

  const degreeOptions = [
    { value: "", label: "Select Degree" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "diploma", label: "Diploma" },
    { value: "certificate", label: "Certificate" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending Approval" },
  ];

  return (
    <div className="space-y-4 w-fit">
      <Input
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleInputChange}
        validator={validators.name}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree
          </label>
          <select
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#42D4BC]"
          >
            {degreeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#42D4BC]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Introduction
        </label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleInputChange}
          placeholder="Tell us about yourself, your experience, and teaching philosophy..."
          className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#42D4BC]"
          maxLength={200}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-red-500">{errors.introduction}</span>
          <span className="text-sm text-gray-500">
            {formData.introduction.length} / 200
          </span>
        </div>
      </div>

      <Button onClick={handleSave} className="px-4 mt-6 text-md">
        Save
      </Button>
    </div>
  );
}
