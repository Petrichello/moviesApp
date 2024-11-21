import { Component } from "react";
import "./SearchPanel.css";
import PropTypes from "prop-types";

export default class SearchPanel extends Component {
  static defaultProps = {
    onLoading: () => {},
  };

  static propTypes = {
    onLoading: PropTypes.func,
  };

  state = {
    term: "",
  };

  searchMovies = (e) => {
    const { onLoading } = this.props;
    const term = e.target.value;
    this.setState({ term });
    onLoading(1, term.trim());
  };

  render() {
    const { term } = this.state;

    return (
      <input
        type="text"
        className="search__input"
        id="search__input"
        placeholder="Type to search..."
        value={term}
        onChange={this.searchMovies}
      />
    );
  }
}
