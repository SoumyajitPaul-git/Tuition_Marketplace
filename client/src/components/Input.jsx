import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    onChange(e);
    if (validator) {
      const message = validator(val);
      setError(message);
    }
  };

  const isPassword = type === "password";

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* make ONLY the input area relative so the icon centers to the input, not the label */}
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full h-12 border border-gray-300 rounded-full px-3 focus:outline-none focus:ring-2 focus:ring-primary text-center ${
            isPassword ? "pr-12" : ""
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1 text-center">{error}</p>
      )}
    </div>
  );
}
