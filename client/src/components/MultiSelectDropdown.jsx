import React, { useState, useRef, useEffect } from 'react';
import './MultiSelectDropdown.css';

const MultiSelectDropdown = ({
  options = [],
  selectedValues = [],
  onChange = () => {},
  placeholder = "Select options",
  label = "",
  selectAllText = "Select All",
  width = "250px",
  maxDisplayItems = 2
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  const toggleSelectAll = () => {
    const allValues = filteredOptions.map(opt => opt.value);
    onChange(selectedValues.length === allValues.length ? [] : allValues);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    
    const selectedOptions = options.filter(opt => 
      selectedValues.includes(opt.value))
      .map(opt => opt.label);
    
    if (selectedOptions.length <= maxDisplayItems) {
      return selectedOptions.join(', ');
    }
    
    const displayed = selectedOptions.slice(0, maxDisplayItems);
    return `${displayed.join(', ')} +${selectedOptions.length - maxDisplayItems} more`;
  };

  return (
    <div className="multi-select-wrapper" ref={dropdownRef}>
      <div className="multi-select-container" style={{ width }}>
        {label && (
          <label className="multi-select-label">
            {label}
          </label>
        )}
        
        <div className="dropdown-content">
          <div 
            className="multi-select-header"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="selected-text">
              {getDisplayText()}
            </span>
            <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </div>

          {isOpen && (
            <div className="multi-select-options">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />

              <div 
                className="select-all-option"
                onClick={toggleSelectAll}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.length === filteredOptions.length && filteredOptions.length > 0}
                  readOnly
                />
                <span>{selectAllText}</span>
              </div>

              <div className="options-list">
                {filteredOptions.map(option => (
                  <div 
                    key={option.value} 
                    className="option-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(option.value);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option.value)}
                      readOnly
                    />
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectDropdown;