// Main.js

import React from 'react';
import './Main.css';
import Navigation from './navigation/Navigation';
import Movies from './movies/Movies';

class Main extends React.Component {

    state = {
        genre: 'Comedy',
        genres: [],
        // information for navigation sliders:
        year: {
            label: "year",
            min: 1990,
            max: 2018,
            step: 1,
            value: {min: 1996, max: 2018}
        },
        rating: {
            label: "rating",
            min: 0,
            max: 10,
            step: 1,
            value: {min: 8, max: 10}
        },
        runtime: {
            label: "runtime",
            min: 0,
            max: 300,
            step: 15,
            value: {min: 60, max: 120}
        }
    }
    
    //fetch genres from themoviedb and store them in the state:
    componentDidMount() {
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        fetch(genresURL)
            .then(response => response.json())
            .then(data => this.setState({ genres: data.genres }))
            .catch(error => console.log(error))
    }

    onGenreChange = event => {
        this.setState({ genre: event.target.value });
    }

    onChange = data => {
        this.setState({
            [data.type]: {
                ...this.state[data.type], //previous value of e.g. this.state.year
                value: data.value // overwrite the value property
            }
        });
    };

    render() {
        return (
            <section className="main">
                <Navigation
                    onChange={this.onChange}
                    onGenreChange={this.onGenreChange}
                    {...this.state}
                />
                <Movies />
            </section>
        )
    }
}

export default Main;