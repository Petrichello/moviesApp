import { Component } from "react";
import { parseISO, format } from "date-fns";
import { Rate } from "antd";
import "./RatedMovieCard.css";
import PropTypes from "prop-types";

import MovieService from "../../services/MovieService";

export default class RatedMovieCard extends Component {
  movieService = new MovieService();

  static defaultProps = {
    posterSrc: "",
    title: "",
    releaseDate: "",
    overview: "",
    voteAverage: 0,
    rating: 0,
  };

  static propTypes = {
    posterSrc: PropTypes.string,
    title: PropTypes.string,
    releaseDate: PropTypes.string,
    overview: PropTypes.string,
    voteAverage: PropTypes.number,
    rating: PropTypes.number,
  };

  rated = (value) => {
    const { guestSessionId, id } = this.props;
    this.movieService.addRating(value, guestSessionId, id);
  };

  trimOverview = (string) => {
    const { genresIds } = this.props;
    if (string.length < 170 && genresIds.length < 4) {
      return string;
    }

    const arrayOfWords = string.split(" ");
    let sum = 0;
    const newOverview = [];
    arrayOfWords.forEach((element) => {
      if (sum < 130) {
        sum += element.length;
        newOverview.push(element);
      }
    });

    return `${newOverview.join(" ")} ...`;
  };

  matchGenres = (id) => {
    const { genres } = this.props;
    genres.get(id);
  };

  filterBorderColor(voteAverage) {
    if (voteAverage < 3) {
      return { border: "2px solid #E90000" };
    }
    if (voteAverage >= 3 && voteAverage < 5) {
      return { border: "2px solid #E97E00" };
    }
    if (voteAverage >= 5 && voteAverage < 7) {
      return { border: "2px solid #E9D100" };
    }

    return { border: "2px solid #66E900" };
  }

  render() {
    const { posterSrc, title, releaseDate, overview, voteAverage, rating, genresIds } = this.props;
    const movieGenres = genresIds.map((element) => (
      <span className="genres__item" key={element}>
        {this.matchGenres(element)}
      </span>
    ));

    return (
      <li className="movie__card">
        <img src={`https://image.tmdb.org/t/p/w500${posterSrc}`} className="poster" alt="poster" />
        <section className="movie__data">
          <h5 className="title">
            <span>{title}</span>
          </h5>
          <div className="release__date">{format(parseISO(releaseDate), "LLLL d, yyyy")}</div>
          <div className="genres">{movieGenres}</div>
          <div className="overview">{this.trimOverview(overview)}</div>
          <span className="rate__value" style={this.filterBorderColor(voteAverage)}>
            {voteAverage.toFixed(1)}
          </span>
          <Rate
            count={10}
            defaultValue={rating}
            style={{
              fontSize: "16px",
              position: "absolute",
              bottom: "10px",
            }}
            onChange={this.rated}
          />
        </section>
      </li>
    );
  }
}
