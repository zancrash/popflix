// Button.js

import React from 'react';
import './Button.css';

const Button = ({ onClick }) => (
    <div className="search-button">
        <button onClick={onClick}>Search</button>
    </div>
)

export default Button;