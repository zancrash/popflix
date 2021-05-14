// MoviePage.js

import React from 'react';
import './MoviePage.css';
import LoadingMovie from './LoadingMovie';
//${process.env.REACT_APP_TMDB_API_KEY}
class MoviePage extends React.Component {
    state = {
        isLoading: true,
        movie: {}
    }

    componentDidMount() {
        // the match object accesses the route parameter (the part of the route pattern that starts with a colon)
        const {movieId} = this.props.match.params;
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=c981a203656e3838652319f640a7de3f&language=en-US`;
        fetch(movieUrl)
            .then(response => response.json())
            .then(data => this.setState({ movie: data, isLoading: false }))
            .catch(error => console.log("Error:", error));
    }

    render(){
        const {
            title,
            backdrop_path,
            release_date,
            genres,
            overview,
            vote_average,
            runtime
        } = this.state.movie;

        // if the release_date is undefined, assign null to year variable, otherwise grab first 4 characters to represent the year:
        const releaseYear = release_date ? release_date.substring(0, 4) : null;
        const imgUrl = `http://image.tmdb.org/t/p/w1280/${backdrop_path}`;
        const backgroundStyle = {
            backgroundImage: `url(${imgUrl})`
        };
        return (
            <div>
                {this.state.isLoading
                    ? <LoadingMovie/>
                    : 
                    <div className="movie-page">
                        <div className="movie-backdrop" style={backgroundStyle} />
                        <div className="movie-details">
                            <h1>{title} <span>{releaseYear}</span></h1>
                            <section className="genres">
                                {genres.map((genre, index) => (
                                    <div key={genre.id}>
                                        <span>{genre.name}</span>
                                        {index < genres.length -1 && (
                                            <span className="separator">|</span>
                                        )}
                                    </div>
                                ))}
                            </section>
                            <h5>
                                Rating:
                                <span>{vote_average}</span>
                            </h5>
                            <h5>
                                Runtime:
                                <span>{`${runtime} min`}</span>
                            </h5>
                            <h4>Overview</h4>
                            <p>{overview}</p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default MoviePage