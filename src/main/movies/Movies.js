// Movies.js

import React from 'react';
import './Movies.css';
import MovieListItem from './MovieListItem';

class Movies extends React.Component {
    state ={
        movies: []
    }

    componentDidMount() {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

        fetch(apiUrl)
            .then(response => response.json()) // the response is the object that carries the data
            /*.then(data => console.log(data))*/ // the data is then logged
            .then(data => this.storeMovies(data)) // pass the data into the storeMovies method
            .catch(error => console.log(error)) // incase the fetch request was unsuccessful, the error is logged
        
            console.log("Before or after data?");
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