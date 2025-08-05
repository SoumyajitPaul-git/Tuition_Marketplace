import { useState, useEffect } from "react";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  validator,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(e); // pass to parent
    if (validator) {
      const message = validator(val);
      setError(message);
    }
  };

  const isPassword = type === "password";

  return (
    <div className="mb-4 relative">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={isPassword && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-center"
      />

      {/* Show/hide password toggle */}
      {isPassword && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-2/4 transform -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-xs mt-1 text-center">{error}</p>
      )}
    </div>
  );
}
