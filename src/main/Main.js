// Main.js

import React from 'react';
import './Main.css';
import Navigation from './navigation/Navigation';
import Movies from './movies/Movies';
//${process.env.REACT_APP_TMDB_API_KEY}
class Main extends React.Component {

    state = {
        movies: [],
        total_pages: 1,
        page: 1,
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=c981a203656e3838652319f640a7de3f&language=en-US`,
        genre: 'Action',
        genres: [],
        // information for navigation sliders:
        year: {
            label: "year",
            min: 1980,
            max: 2023,
            step: 1,
            value: {min: 1996, max: 2023}
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
        },
        moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=c981a203656e3838652319f640a7de3f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    }

    componentDidMount() {
        const savedState = this.getStateFromLocalStorage();
        // if there are no movies in the savedState.movies array, fetch movies:
        if ( !savedState || (savedState && !savedState.movies.length)) {
            this.fetchMovies(this.state.moviesUrl);
        } // otherwise, save the retrieved data in the state and generate new url based on the retrieved data:
        else {
            this.setState({ ...savedState });
            this.generateUrl(savedState);
        }
    }

    // re-fetch movies when the search button is clicked and pagination is used:
    componentWillUpdate(nextProps, nextState) {
        this.saveStateToLocalStorage();
        if (this.state.moviesUrl !==  nextState.moviesUrl) {
            this.fetchMovies(nextState.moviesUrl)
        }
        if (this.state.page !== nextState.page){
            this.generateUrl(nextState);
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

        // store the data (movies and total pages) in the state:
        this.setState({ movies, total_pages: data.total_pages })
    }

    
    onGenreChange = event => {
        this.setState({ genre: event.target.value });
    }

    //this method will store genres and pass it down to the Navigation component.
    setGenres = genres => {
        this.setState({genres});
    }    

    onChange = data => {
        this.setState({
            [data.type]: {
                ...this.state[data.type], //previous value of e.g. this.state.year
                value: data.value // overwrite the value property
            }
        });
    };

    // method to generate a url using information from the state
    generateUrl = (params) => {
        const { genres, year, rating, runtime, page } = params;
        const selectedGenre = genres.find( genre => genre.name === params.genre );
        const genreId = selectedGenre.id;

        const moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
            `api_key=c981a203656e3838652319f640a7de3f&` +
            `language=en-US&sort_by=popularity.desc&` +
            `with_genres=${genreId}&` +
            `primary_release_date.gte=${year.value.min}-01-01&` +
            `primary_release_date.lte=${year.value.max}-12-31&` +
            `vote_average.gte=${rating.value.min}&` +
            `vote_average.lte=${rating.value.max}&` +
            `with_runtime.gte${runtime.value.min}&` +
            `with_runtime.lte${runtime.value.max}&` +
            `page=${page}`;
        
        this.setState({ moviesUrl });
    }

    // update the page value in the state if the next page exists
    onPageIncrease = () => {
        const {page, total_pages} = this.state
        const nextPage = page + 1;
        if (nextPage <= total_pages) {
            this.setState({ page: nextPage })
        }
    }

    // update the page value only if it is greater than 0
    onPageDecrease = () => {
        const {page} = this.state
        const nextPage = page -1;
        if (nextPage > 0) {
            this.setState({ page: nextPage })
        }
    }

    // generateUrl method is called when the search button is clicked
    onSearchButtonClick = () => {
        this.setState({ page: 1 });
        this.generateUrl(this.state);
    }

    // save application state to local storage:
    saveStateToLocalStorage = () => {
        localStorage.setItem('popflix.params', JSON.stringify(this.state));
    }

    // restore application state from local storage:
    getStateFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('popflix.params'));
    }

    render() {
        return (
            <section className="main">
                <Navigation
                    onChange={this.onChange}
                    onGenreChange={this.onGenreChange}
                    setGenres={this.setGenres}
                    onSearchButtonClick={this.onSearchButtonClick}
                    {...this.state}
                />
                <Movies 
                    movies={this.state.movies}
                    page={this.state.page}
                    onPageIncrease={this.onPageIncrease}
                    onPageDecrease={this.onPageDecrease}
                />
            </section>
        )
    }
}

export default Main;