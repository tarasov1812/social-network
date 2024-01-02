import React from 'react';

function Theme({ customKey, tag, messages }) {
  return (
    <div key={customKey}>
      <h5>{tag}</h5>
      <p>{messages}</p>
    </div>
  );
}

export default Theme;
