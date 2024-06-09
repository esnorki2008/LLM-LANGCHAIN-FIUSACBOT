import React, { useState } from 'react';
import './Button.css';

const Button = ({onClick,title}) => {
  return (
    <button onClick={onClick}>
            {title}
    </button>
  );
};

export default Button;
