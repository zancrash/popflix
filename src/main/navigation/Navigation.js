// Navigation.js

import React from 'react';
import './Navigation.css';
import Selection from './Selection';
import Slider from './Slider';
import Button from './Button';
//${process.env.REACT_APP_TMDB_API_KEY}
class Navigation extends React.Component {

    //fetch genres list from themoviedb and store them in the state:
    componentDidMount() {
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=c981a203656e3838652319f640a7de3f&language=en-US`
        fetch(genresURL)
            .then(response => response.json())
            //pass data.genres as an argument to the setGenres method in the Main component:
            .then(data => this.props.setGenres( data.genres ))
            .catch(error => console.log(error))
    }
    
    render() {
        const { genre, genres, onGenreChange, onChange, year, rating, runtime, onSearchButtonClick } = this.props;
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

                <Button onClick={onSearchButtonClick}>
                    Search
                </Button>

            </section>
        )
    }
}

export default Navigation;