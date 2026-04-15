import { getMovieById, getTVById } from "./api.js";
import { getParam, alertMessage } from "./utils.mjs";
import { addToWatchlist, removeFromWatchlist, isInWatchlist, updateSeriesStatus } from "./watchlist.js";

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
  const inList = isInWatchlist(tv.id, "tv");
  const genres = tv.genres.map(g => g.name).join(", ");
  const networks = tv.networks.map(n => n.name).join(", ");
  const languages = tv.languages.join(", ");

  container.innerHTML = `
    <section class="hero" style="background-image: url('https://image.tmdb.org/t/p/original${tv.backdrop_path}')">
      <div class="overlay">
        <h1>${tv.name}</h1>
        <p class="rating">⭐ ${tv.vote_average.toFixed(1)} (${tv.vote_count})</p>
      </div>
    </section>
    <section class="details-container">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}" />
      <div class="info">
        <p><strong>Overview:</strong> ${tv.overview}</p>
        <p><strong>Genres:</strong> ${genres}</p>
        <p><strong>First Air:</strong> ${tv.first_air_date}</p>
        <p><strong>Seasons:</strong> ${tv.number_of_seasons} | <strong>Episodes:</strong> ${tv.number_of_episodes}</p>
        <p><strong>Status:</strong> ${tv.status}</p>
        ${tv.homepage ? `<a href="${tv.homepage}" target="_blank" class="btn">Official Site</a>` : ""}
        <button id="watchlist-btn" class="btn"></button>
        ${inList ? `
        <div style="margin-top:1rem;">
          <label style="display:block;margin-bottom:0.5rem;">Status:</label>
          <select id="tv-status" style="padding:0.5rem;background:#222;color:white;border:1px solid #444;border-radius:4px;cursor:pointer;">
            <option value="to_watch">To Watch</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </select>
        </div>` : ''}
      </div>
    </section>
  `;

  const btn = document.getElementById("watchlist-btn");
  updateButton(btn, tv.id, "tv");

  btn.addEventListener("click", () => {
    if (inList) {
      removeFromWatchlist(tv.id, "tv");
      alertMessage("Removed from Watchlist");
    } else {
      addToWatchlist({ id: tv.id, title: tv.name, poster_path: tv.poster_path, type: "tv", status: "to_watch" });
      alertMessage("Added to Watchlist");
      location.reload();
      return;
    }
    updateButton(btn, tv.id, "tv");
  });

  if (inList) {
    const list = JSON.parse(localStorage.getItem("media-watchlist")) || [];
    const item = list.find(i => i.id === tv.id && i.type === "tv");
    const select = document.getElementById("tv-status");
    if (select && item?.status) select.value = item.status;
    select?.addEventListener("change", (e) => {
      updateSeriesStatus(tv.id, e.target.value);
      alertMessage(`Status: ${e.target.value.replace("_", " ")}`);
    });
  }
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