import React from 'react';

function Theme({ tag, messages }) {
  return (
    <>
      <h5>{tag}</h5>
      <p>{messages}</p>
    </>
  );
}

export default Theme;
