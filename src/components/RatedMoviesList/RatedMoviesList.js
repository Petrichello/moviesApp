import "./RatedMoviesList.css";
import RatedMovieCard from "../RatedMovieCard/RatedMovieCard";
import { GenresConsumer } from "../GenresContext/GenresContext";

function RatedMoviesList({ movies, guestSessionId }) {
  const elements = movies.map((element) => {
    const { id } = element;
    return (
      <GenresConsumer key={id}>
        {(genres) => <RatedMovieCard key={id} {...element} genres={genres} guestSessionId={guestSessionId} />}
      </GenresConsumer>
    );
  });

  return <ul className="movies__list">{elements}</ul>;
}

export default RatedMoviesList;
