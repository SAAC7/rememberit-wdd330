import { loadHeaderFooter } from './utils.mjs';
import { getPopularMovies } from "./api.js";


init();

function init() {
  loadHeaderFooter();
  loadPopularMovies();
}



async function loadPopularMovies() {
  const movies = await getPopularMovies();
  const container = document.querySelector("#movie-list");

  container.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
      </div>
    `
    )
    .join("");
}
