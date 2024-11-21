import { Component } from "react";
import { Alert } from "antd";
import { Offline, Online } from "react-detect-offline";

import MovieService from "../../services/MovieService";
import RatedMoviesList from "../RatedMoviesList/RatedMoviesList";
import { GenresProvider } from "../GenresContext/GenresContext";

export default class Rated extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    error: false,
  };

  componentDidMount() {
    const { guestSessionId } = this.props;
    this.movieService
      .getRatedMovies(guestSessionId, 1)
      .then((elements) => {
        const moviesArray = [];
        elements.results.forEach((element) => {
          const movieData = {
            id: element.id,
            posterSrc: element.poster_path,
            title: element.title,
            releaseDate: element.release_date,
            genresIds: element.genre_ids,
            overview: element.overview,
            voteAverage: element.vote_average,
            rating: element.rating,
          };
          moviesArray.push(movieData);
        });

        this.setState({
          movies: moviesArray,
        });
      })
      .catch(this.onError);
  }

  onError = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    const { movies, error } = this.state;
    const { guestSessionId, genres } = this.props;

    const errorMessage = error ? (
      <Alert
        type="error"
        message="Error"
        description="Sorry, something went wrong. It's possible that you haven't rated any films yet."
        showIcon
      />
    ) : null;

    const ratedMoviesList =
      !error && movies.length !== 0 ? (
        <GenresProvider value={genres}>
          <RatedMoviesList movies={movies} guestSessionId={guestSessionId} />
        </GenresProvider>
      ) : null;

    return (
      <>
        <Online>
          {errorMessage}
          {ratedMoviesList}
        </Online>
        <Offline>
          <Alert type="error" message="Error" description="No internet connection" showIcon />
        </Offline>
      </>
    );
  }
}
