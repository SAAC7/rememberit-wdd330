import { getPopularMovies } from "./api.js";

let currentPage = 1;
let totalPages = 1;

export async function initMovieList() {
  await loadMovies(1);
}

async function loadMovies(page) {
  const data = await getPopularMovies(page);

  const { movies, totalPages: tp, currentPage: cp } = data;

  currentPage = cp;
  totalPages = tp;

  renderMovies(movies);
  renderPagination();
}

function renderMovies(movies) {
  const container = document.querySelector("#movie-list");

  container.innerHTML = movies.map(movieCardTemplate).join("");
}

function movieCardTemplate(movie) {
  return `
    <div class="movie-card" data-id="${movie.id}">
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" />
      <h3>${movie.title}</h3>
    </div>
  `;
}

function renderPagination() {
  const container = document.querySelector("#pagination");

  container.innerHTML = `
    <button id="prev-page" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button id="next-page" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
  `;

  document.querySelector("#prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      loadMovies(currentPage - 1);
    }
  });

  document.querySelector("#next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
      loadMovies(currentPage + 1);
    }
  });
}