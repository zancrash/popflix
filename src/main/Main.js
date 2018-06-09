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

    //this method will store genres and pass it down to the Navigation component.
    setGenres = genres => {
        this.setState({genres});
    }

    render() {
        return (
            <section className="main">
                <Navigation
                    onChange={this.onChange}
                    onGenreChange={this.onGenreChange}
                    setGenres={this.setGenres}
                    {...this.state}
                />
                <Movies />
            </section>
        )
    }
}

export default Main;