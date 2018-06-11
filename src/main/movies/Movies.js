// Movies.js

import React from 'react';
import './Movies.css';
import MovieListItem from './MovieListItem';

class Movies extends React.Component {
    state ={
        movies: []
    }

    componentDidMount() {
        this.fetchMovies(this.props.url);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.url !== nextProps.url) {
            this.fetchMovies(nextProps.url);
        }
    }

    fetchMovies = (url) => {
        fetch(url)
            .then(response => response.json()) // the response is the object that carries the data
            .then(data => this.storeMovies(data)) // pass the data into the storeMovies method
            .catch(error => console.log(error)) // incase the fetch request was unsuccessful, the error is logged
    }

    storeMovies = data => {
        // 'movies' variable assigned to the result of iteration through 'data.results' array:
        const movies = data.results.map( result => {
            // destructure every 'result' object and assign its properties to respective variables:
            const {
                vote_count,
                id,
                genre_ids,
                poster_path,
                title,
                vote_average,
                release_date
            } = result;
            // return the variables as one object:
            return {vote_count, id, genre_ids, poster_path, title, vote_average, release_date};
        });

        // store the data in the state:
        this.setState({ movies })
    }

    render() {
        return (
            <section>
                <ul className="movies">
                    {
                        // the next movie will be passed through to the 'MovieListItem' componenet
                        this.state.movies.map( movie => (
                            <MovieListItem key={movie.id} movie={movie} />
                        ))
                    }
                </ul>
            </section>
        )
    }
}

export default Movies;