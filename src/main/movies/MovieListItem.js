import React from 'react';
import './MovieListItem.css';
import {Link} from 'react-router-dom';

// while iterating through the 'this.state.movies' array, the 'movie' object will be passed.
const MovieListItem = ({ movie }) => {
    const { id, title, poster_path, vote_average, release_date } = movie;
    const imgUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
    const year = release_date.substring(0, 4);

    return (
        <li className="movie-item">
            <Link to={`/popflix/movies/${id}`} className="thumbnail">
                <img src={imgUrl} alt="{title}"/>
                <div className="movie-description">
                    <h2>{title}</h2>
                    <section className="movie-details">
                        <div className="movie-year">
                            <span className="title">Year</span>
                            <span>{year}</span>
                        </div>
                        <div className="movie-rating">
                            <span className="title">Rating</span>
                            <span>{vote_average}</span>
                        </div>
                    </section>
                </div>
            </Link>
        </li>
    )
};

export default MovieListItem;