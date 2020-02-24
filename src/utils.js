import React from 'react';

export const emoji = (emoji, label) => {
  return <span role="img" aria-label={label}>{emoji}</span>
}

export default emoji;
