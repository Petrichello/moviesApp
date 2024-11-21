import React from "react";
import { createRoot } from "react-dom/client";
import { Tabs } from "antd";

import Search from "./components/Search/Search";
import Rated from "./components/Rated/Rated";
import MovieService from "./services/MovieService";
import "./index.css";

export default class App extends React.Component {
  movieService = new MovieService();

  genres = new Map();

  state = {
    guestSessionId: null,
    genres: this.genres,
  };

  componentDidMount() {
    this.movieService.createGuestSession().then((response) => {
      this.setState({
        guestSessionId: response.guest_session_id,
      });
    });
    this.movieService.getGenres().then((response) => {
      response.genres.forEach((element) => {
        this.genres.set(element.id, element.name);
      });
    });
  }

  render() {
    const { guestSessionId, genres } = this.state;
    const items = [
      {
        key: "1",
        label: "Search",
        children: <Search guestSessionId={guestSessionId} genres={genres} />,
      },
      {
        key: "2",
        label: "Rated",
        children: <Rated guestSessionId={guestSessionId} genres={genres} />,
      },
    ];

    return <Tabs items={items} centered destroyInactiveTabPane />;
  }
}

const app = document.querySelector(".movies__app");
const root = createRoot(app);
root.render(<App />);
