export default class MovieService {
  async getService(page, query) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=02b35fb40cf2b5a0b7cad12caa51f95e&page=${page}`
    );

    if (!res.ok) {
      throw new Error(`Couldn't fetch, received ${res.status}`);
    }

    return res.json();
  }

  async createGuestSession() {
    const res = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=02b35fb40cf2b5a0b7cad12caa51f95e"
    );

    if (!res.ok) {
      throw new Error(`Couldn't fetch, received ${res.status}`);
    }

    return res.json();
  }

  async addRating(value, guestSessionId, movieId) {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmIzNWZiNDBjZjJiNWEwYjdjYWQxMmNhYTUxZjk1ZSIsIm5iZiI6MTczMTc3NjcwNS4wNTA5MTYyLCJzdWIiOiI2NzM0OWQ2Nzc2YWYzYWU3YjYzOGMyNTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Du8obskjnVRAtosudIUaRZl7ygbP6B4sGkeySgYwnxg",
      },
      body: `{"value":${value}}`,
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}&api_key=02b35fb40cf2b5a0b7cad12caa51f95e`,
      options
    );

    if (!res.ok) {
      throw new Error(`Couldn't fetch, received ${res.status}`);
    }

    return res.json();
  }

  async getRatedMovies(guestSessionId, page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=02b35fb40cf2b5a0b7cad12caa51f95e&page=${page}`
    );

    if (!res.ok) {
      throw new Error(`Couldn't fetch, received ${res.status}`);
    }

    return res.json();
  }

  async getGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=02b35fb40cf2b5a0b7cad12caa51f95e`);

    if (!res.ok) {
      throw new Error(`Couldn't fetch, received ${res.status}`);
    }

    return res.json();
  }
}
