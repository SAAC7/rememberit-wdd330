import { getMovieById, getTVById } from "./api.js";
import { getParam, alertMessage } from "./utils.mjs";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "./watchlist.js";

export async function initMovieDetails() {
  const id = getParam("id");
  const type = getParam("type") || "movie";

  if (!id) {
    console.error("No ID found in URL");
    return;
  }

  try {
    const media = type === "tv" ? await getTVById(id) : await getMovieById(id);
    console.log(media);
    type === "tv" ? renderTVDetails(media) : renderMovieDetails(media);
  } catch (error) {
    console.error(error);
    showError();
  }
}

function renderMovieDetails(movie) {
  document.title = `${movie.title} | RememberIt`;

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
      <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />

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

  const btn = document.getElementById("watchlist-btn");
  updateButton(btn, movie.id, "movie");

  btn.addEventListener("click", () => {
    if (isInWatchlist(movie.id, "movie")) {
      removeFromWatchlist(movie.id, "movie");
      alertMessage("Removed from Watchlist");
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        type: "movie"
      });

      alertMessage("Added to Watchlist");
    }

    updateButton(btn, movie.id, "movie");
  });
}

function renderTVDetails(tv) {
  document.title = `${tv.name} | RememberIt`;

  const container = document.querySelector("#movie-detail");

  const genres = tv.genres.map(g => g.name).join(", ");
  const networks = tv.networks.map(n => n.name).join(", ");
  const languages = tv.languages.join(", ");

  const seasonsHTML = tv.seasons.map((season, index) => `
    <div class="season-item">
      <h4>Season ${season.season_number}</h4>
      <p>Episodes: ${season.episode_count}</p>
      ${season.air_date ? `<p>Aired: ${season.air_date}</p>` : ""}
    </div>
  `).join("");

  container.innerHTML = `
    <section class="hero" style="background-image: url('https://image.tmdb.org/t/p/original${tv.backdrop_path}')">
      <div class="overlay">
        <h1>${tv.name}</h1>
        <p class="tagline">${tv.tagline || ""}</p>
        <p class="rating">⭐ ${tv.vote_average.toFixed(1)} (${tv.vote_count})</p>
      </div>
    </section>

    <section class="details-container">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}" />

      <div class="info">
        <p><strong>Overview:</strong> ${tv.overview}</p>
        <p><strong>Genres:</strong> ${genres}</p>
        <p><strong>First Air Date:</strong> ${tv.first_air_date}</p>
        <p><strong>Total Seasons:</strong> ${tv.number_of_seasons}</p>
        <p><strong>Total Episodes:</strong> ${tv.number_of_episodes}</p>
        <p><strong>Status:</strong> ${tv.status}</p>
        <p><strong>Language:</strong> ${languages}</p>
        <p><strong>Networks:</strong> ${networks}</p>
        
        ${
          tv.homepage
            ? `<a href="${tv.homepage}" target="_blank" class="btn">Official Site</a>`
            : ""
        }

        <button id="watchlist-btn" class="btn"></button>
      </div>
    </section>

    <section class="seasons-section" style="padding: 2rem; max-width: 1100px; margin: auto;">
      <h2>Seasons</h2>
      <div class="seasons-grid">
        ${seasonsHTML}
      </div>
    </section>
  `;

  // Estilos para seasons
  const style = document.createElement("style");
  style.textContent = `
    .seasons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .season-item {
      background: #222;
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid #e50914;
    }
    .season-item h4 {
      margin-top: 0;
      color: #e50914;
    }
    .season-item p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
  `;
  document.head.appendChild(style);

  const btn = document.getElementById("watchlist-btn");
  updateButton(btn, tv.id, "tv");

  btn.addEventListener("click", () => {
    if (isInWatchlist(tv.id, "tv")) {
      removeFromWatchlist(tv.id, "tv");
      alertMessage("Removed from Watchlist");
    } else {
      addToWatchlist({
        id: tv.id,
        title: tv.name,
        poster_path: tv.poster_path,
        type: "tv"
      });

      alertMessage("Added to Watchlist");
    }

    updateButton(btn, tv.id, "tv");
  });
}

function updateButton(btn, id, type) {
  if (isInWatchlist(id, type)) {
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
    <p style="padding: 2rem; text-align: center;">Something went wrong loading the details.</p>
  `;
}