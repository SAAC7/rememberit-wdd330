import { getMovieById, getTVById, getTVSeasonDetails } from "./api.js";
import { getParam, alertMessage } from "./utils.mjs";
import { addToWatchlist, removeFromWatchlist, isInWatchlist, updateSeriesStatus, getEpisodeStatusMap, isEpisodeWatched, toggleEpisodeWatched } from "./watchlist.js";

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
      </div>
    </section>

    <section class="tv-season-section">
      <h2>Seasons</h2>
      <div id="season-buttons" class="season-buttons">
        ${tv.seasons.map(season => `
          <button class="season-btn" data-season="${season.season_number}">
            ${season.name || `Season ${season.season_number}`} (${season.episode_count})
          </button>
        `).join("")}
      </div>
      <div id="season-details" class="season-details"></div>
    </section>
  `;

  const btn = document.getElementById("watchlist-btn");
  updateButton(btn, tv.id, "tv");

  btn.addEventListener("click", () => {
    const currentlyInList = isInWatchlist(tv.id, "tv");
    if (currentlyInList) {
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

  setupSeasonButtons(tv, btn, tv);
}

function setupSeasonButtons(tv, watchlistBtn) {
  const buttons = document.querySelectorAll(".season-btn");
  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      await loadSeasonEpisodes(tv.id, Number(button.dataset.season), tv, watchlistBtn);
    });
  });

  const firstButton = buttons[0];
  if (firstButton) {
    firstButton.classList.add("active");
    loadSeasonEpisodes(tv.id, Number(firstButton.dataset.season), tv, watchlistBtn);
  }
}

async function loadSeasonEpisodes(tvId, seasonNumber, tv, watchlistBtn) {
  const detailsContainer = document.getElementById("season-details");
  if (!detailsContainer) return;

  detailsContainer.innerHTML = `<p class="loading-text">Loading episodes...</p>`;

  try {
    const season = await getTVSeasonDetails(tvId, seasonNumber);
    detailsContainer.innerHTML = `
      <div class="season-header">
        <h3>${season.name || `Season ${season.season_number}`}</h3>
        <p>${season.overview || ""}</p>
      </div>
      <div class="episode-list">
        ${season.episodes.map(episode => {
          const watched = isEpisodeWatched(tvId, season.season_number, episode.episode_number);
          return `
            <article class="episode-item">
              <div class="episode-meta">
                <strong>S${String(season.season_number).padStart(2, "0")}E${String(episode.episode_number).padStart(2, "0")} - ${episode.name}</strong>
                <p>${episode.air_date || "TBA"}</p>
                ${episode.overview ? `<p class="episode-overview">${episode.overview}</p>` : ""}
              </div>
              <div class="episode-actions">
                <span class="episode-status ${watched ? "seen" : "unseen"}">${watched ? "Watched" : "Not watched"}</span>
                <button class="episode-watch-btn ${watched ? "watched" : ""}" data-season="${season.season_number}" data-episode="${episode.episode_number}">
                  ${watched ? "Mark unwatched" : "Mark watched"}
                </button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;

    attachEpisodeWatchListeners(tv, watchlistBtn);
  } catch (error) {
    console.error(error);
    detailsContainer.innerHTML = `<p class="error-text">Unable to load season episodes.</p>`;
  }
}

function getWatchedEpisodeCount(tvId) {
  const statusMap = getEpisodeStatusMap();
  const showStatus = statusMap[tvId] || {};
  return Object.values(showStatus).reduce((count, seasonMap) => count + Object.keys(seasonMap).length, 0);
}

function getSeriesStatusFromEpisodes(tvId, totalEpisodes) {
  const watchedCount = getWatchedEpisodeCount(tvId);
  if (watchedCount === 0) return "to_watch";
  if (totalEpisodes > 0 && watchedCount >= totalEpisodes) return "watched";
  return "watching";
}

function updateSeriesStatusWithEpisodeState(tv, watchlistBtn) {
  const status = getSeriesStatusFromEpisodes(tv.id, tv.number_of_episodes || 0);
  if (isInWatchlist(tv.id, "tv")) {
    updateSeriesStatus(tv.id, status);
  } else {
    addToWatchlist({ id: tv.id, title: tv.name, poster_path: tv.poster_path, type: "tv", status });
  }
  if (watchlistBtn) {
    updateButton(watchlistBtn, tv.id, "tv");
  }
  return status;
}

function attachEpisodeWatchListeners(tv, watchlistBtn) {
  document.querySelectorAll(".episode-watch-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const seasonNumber = Number(btn.dataset.season);
      const episodeNumber = Number(btn.dataset.episode);
      const watched = toggleEpisodeWatched(tv.id, seasonNumber, episodeNumber);

      const episodeItem = btn.closest(".episode-item");
      const statusBadge = episodeItem.querySelector(".episode-status");
      const watchedLabel = watched ? "Mark unwatched" : "Mark watched";

      btn.textContent = watchedLabel;
      btn.classList.toggle("watched", watched);
      if (statusBadge) {
        statusBadge.textContent = watched ? "Watched" : "Not watched";
        statusBadge.classList.toggle("seen", watched);
        statusBadge.classList.toggle("unseen", !watched);
      }

      const currentStatus = updateSeriesStatusWithEpisodeState(tv, watchlistBtn);
      alertMessage(watched ? "Episode marked watched" : "Episode marked unwatched");
      if (currentStatus === "watching") {
        alertMessage("Series status: Watching");
      } else if (currentStatus === "watched") {
        alertMessage("Series status: Watched");
      }
    });
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