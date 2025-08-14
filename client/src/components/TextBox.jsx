import React, { useState } from 'react';

const TextBox = ({ 
  maxLength = 100,  // Default value if not provided
  placeholder = "Type here...",
  showCounter = true,  // Optionally hide counter
  inputStyle = {},
  counterStyle = {}
}) => {
  const [text, setText] = useState('');
  const remainingChars = maxLength - text.length;

  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  return (
    <div style={{ ...styles.container, ...inputStyle }}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ ...styles.input, ...inputStyle }}
        maxLength={maxLength}
      />
      {showCounter && (
        <span style={{ ...styles.counter, ...counterStyle }}>
          {remainingChars}
        </span>
      )}
    </div>
  );
};

// Default styles (can be overridden via props)
const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '50px',
    paddingRight: '50px', // Space for counter
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  counter: {
    position: 'absolute',
    right: '1%',
    top: '90%',
    transform: 'translateY(-50%)',
    color: '#666',
    fontSize: '14px',
  },
};

export default TextBox;