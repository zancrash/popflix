// Selection.js

import React from 'react';
import './Selection.css'

// this component recieves and maps the array of genres from the Navigation component to generate genre option elements:
const Selection = ({ genres, genre, onGenreChange }) => (
    <div className="selection">
        <label>Genre</label>
        <select value={genre} onChange={onGenreChange}>
            {genres.map( genre => (
                <option value={genre.name} key={genre.id}>{genre.name}</option>
            ))}
        </select>
    </div>
);

export default Selection;