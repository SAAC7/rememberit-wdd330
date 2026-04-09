import { getMovieById } from "./api.js";
import { getParam, alertMessage } from "./utils.mjs";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "./watchlist.js";

export async function initMovieDetails() {
  const id = getParam("id");

  if (!id) {
    console.error("No movie ID found in URL");
    return;
  }

  try {
    const movie = await getMovieById(id);
    console.log(movie);
    renderMovieDetails(movie);
  } catch (error) {
    console.error(error);
    showError();
  }
}

function renderMovieDetails(movie) {
  document.title = `${movie.title} | Movie Tracker`;

  const container = document.querySelector("#movie-detail");

  const genres = movie.genres.map(g => g.name).join(", ");
  const companies = movie.production_companies.map(c => c.name).join(", ");
  const languages = movie.spoken_languages.map(l => l.english_name).join(", ");

  container.innerHTML = `
    <section class="hero" style="background-image: url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')">
      <div class="overlay">
        <h1>${movie.title}</h1>
        <p class="tagline">${movie.tagline || ""}</p>
        <p class="rating">⭐ ${movie.vote_average.toFixed(1)} (${movie.vote_count})</p>
      </div>
    </section>

    <section class="details-container">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />

      <div class="info">
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <p><strong>Genres:</strong> ${genres}</p>
        <p><strong>Release:</strong> ${movie.release_date}</p>
        <p><strong>Runtime:</strong> ${movie.runtime} min</p>
        <p><strong>Status:</strong> ${movie.status}</p>
        <p><strong>Language:</strong> ${languages}</p>
        <p><strong>Budget:</strong> $${movie.budget.toLocaleString()}</p>
        <p><strong>Revenue:</strong> $${movie.revenue.toLocaleString()}</p>
        <p><strong>Companies:</strong> ${companies}</p>
        
        ${
          movie.homepage
            ? `<a href="${movie.homepage}" target="_blank" class="btn">Official Site</a>`
            : ""
        }

        <button id="watchlist-btn" class="btn"></button>
      </div>
    </section>
  `;

  // 🔥 AQUÍ ya existe el botón
  const btn = document.getElementById("watchlist-btn");

  updateButton(btn, movie.id);

  btn.addEventListener("click", () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      alertMessage("Removed from Watchlist");
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      });

      alertMessage("Added to Watchlist");
    }

    updateButton(btn, movie.id);
  });
}

function updateButton(btn, id) {
  if (isInWatchlist(id)) {
    btn.textContent = "Remove from Watchlist";
    btn.style.background = "#555";
  } else {
    btn.textContent = "Add to Watchlist";
    btn.style.background = "#e50914";
  }
}

function showError() {
  const container = document.querySelector("#movie-detail");

  container.innerHTML = `
    <p>Something went wrong loading the movie details.</p>
  `;
}