// Navigation.js

import React from 'react';
import './Navigation.css';
import Selection from './Selection';
import Slider from './Slider';

class Navigation extends React.Component {
    
    render() {
        const { genre, genres, onGenreChange, onChange, year, rating, runtime } = this.props;
        return (
            <section className="navigation">
                <Selection
                    genre={genre}
                    genres={genres}
                    onGenreChange={onGenreChange}
                />

                <Slider data={year} onChange={onChange} />
                <Slider data={rating} onChange={onChange} />
                <Slider data={runtime} onChange={onChange} />

            </section>
        )
    }
}

export default Navigation;