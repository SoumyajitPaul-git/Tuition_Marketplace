import React from 'react';

const Dropdown = ({
  label = "",
  options = [],          // Array of { value, label } objects
  value = "",           // Currently selected value
  onChange = () => {},  // Handle selection change
  placeholder = "List",
  disabled = false,
  style = {},           // Custom styles for the dropdown
  optionStyle = {},     // Custom styles for options
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{ 
        padding: "8px 12px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "30%",
        maxWidth: "300px",
        ...style,  // Override defaults with custom styles
      }}
    >
      {placeholder && (
        <option value="" disabled style={optionStyle}>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
          style={optionStyle}
        >
          {option.label || option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;