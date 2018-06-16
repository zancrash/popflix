// Button.js

import React from 'react';
import './Button.css';

// The children property is passed in props. It is the content between the opening and closing tag of the component.
const Button = ({ onClick, children }) => (
    <div className="search-button">
        <button onClick={onClick}>
            {children}
        </button>
    </div>
)

export default Button;