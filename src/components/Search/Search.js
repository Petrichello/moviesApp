import { Component } from "react";
import { Offline, Online } from "react-detect-offline";
import { Alert, Spin } from "antd";
import { debounce } from "lodash";

import SearchPanel from "../SearchPanel/SearchPanel";
import MoviesList from "../MoviesList/MoviesList";
import MovieService from "../../services/MovieService";
import { GenresProvider } from "../GenresContext/GenresContext";

export default class Search extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: false,
    error: false,
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onLoading = (pageNumber, query) => {
    if (query !== "") {
      this.getMovies(pageNumber, query);

      this.setState({ loading: true });
    } else {
      this.setState({
        movies: [],
      });
    }
  };

  getMovies = debounce((pageNumber, query) => {
    this.movieService
      .getService(pageNumber, query)
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
          };
          moviesArray.push(movieData);
        });

        this.setState({
          movies: moviesArray,
          loading: false,
        });
      })
      .catch(this.onError);
  }, 1000);

  render() {
    const { movies, loading, error } = this.state;
    const { guestSessionId, genres } = this.props;

    const hasData = !(loading || error);
    const errorMessage = error ? (
      <Alert type="error" message="Error" description="Sorry, something went wrong" showIcon />
    ) : null;

    const spinner = loading ? <Spin size="large" style={{ alignSelf: "center" }} /> : null;

    const moviesList =
      hasData && movies.length !== 0 ? (
        <GenresProvider value={genres}>
          <MoviesList movies={movies} getMovies={this.getMovies} guestSessionId={guestSessionId} />
        </GenresProvider>
      ) : null;

    return (
      <>
        <SearchPanel onLoading={this.onLoading} />
        <Online>
          {errorMessage}
          {spinner}
          {moviesList}
        </Online>
        <Offline>
          <Alert type="error" message="Error" description="No internet connection" showIcon />
        </Offline>
      </>
    );
  }
}
