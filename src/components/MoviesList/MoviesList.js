import { Component } from "react";
import "./MoviesList.css";
import { Pagination, Spin } from "antd";
import PropTypes from "prop-types";

import { GenresConsumer } from "../GenresContext/GenresContext";
import MovieCard from "../MovieCard/MovieCard";

export default class MoviesList extends Component {
  static defaultProps = {
    getMovies: () => {},
  };

  static propTypes = {
    getMovies: PropTypes.func,
  };

  onChange = (pageNumber) => {
    const { getMovies } = this.props;
    const input = document.querySelector("input");
    getMovies(pageNumber, input.value);
  };

  render() {
    const { movies, guestSessionId } = this.props;

    if (!movies) {
      return <Spin />;
    }

    const elements = movies.map((element) => {
      const { id } = element;
      return (
        <GenresConsumer key={id}>
          {(genres) => <MovieCard key={id} {...element} genres={genres} guestSessionId={guestSessionId} />}
        </GenresConsumer>
      );
    });

    return (
      <ul className="movies__list">
        {elements}
        <li>
          <Pagination
            defaultCurrent={1}
            total={5000}
            showSizeChanger={false}
            onChange={this.onChange}
            style={{ marginBottom: "10px" }}
          />
        </li>
      </ul>
    );
  }
}
