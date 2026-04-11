import { loadHeaderFooter } from "./utils.mjs";
import { getWatchlist, removeFromWatchlist, getMoviesFromWatchlist, getSeriesFromWatchlist } from "./watchlist.js";
import { alertMessage } from "./utils.mjs";

init();

function init() {
  loadHeaderFooter();
  setupTabs();
  displayMovies();
}

function setupTabs() {
  const moviesTab = document.querySelector("#tab-watchlist-movies");
  const seriesTab = document.querySelector("#tab-watchlist-series");

  moviesTab.addEventListener("click", () => {
    updateActiveTab(moviesTab, seriesTab);
    displayMovies();
  });

  seriesTab.addEventListener("click", () => {
    updateActiveTab(seriesTab, moviesTab);
    displaySeries();
  });
}

function updateActiveTab(activeBtn, inactiveBtn) {
  activeBtn.style.background = "#e50914";
  inactiveBtn.style.background = "#333";
}

function displayMovies() {
  const movies = getMoviesFromWatchlist();
  const container = document.querySelector("#watchlist-content");

  if (movies.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: #999;">
        <p>No movies in your watchlist yet</p>
        <a href="./index.html" class="btn" style="display: inline-block; margin-top: 1rem;">Start Adding Movies</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="movie-grid">
      ${movies.map(movie => watchlistItemTemplate(movie, "movie")).join("")}
    </div>
  `;

  attachRemoveListeners(movies, "movie");
}

function displaySeries() {
  const series = getSeriesFromWatchlist();
  const container = document.querySelector("#watchlist-content");

  if (series.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: #999;">
        <p>No series in your watchlist yet</p>
        <a href="./index.html" class="btn" style="display: inline-block; margin-top: 1rem;">Start Adding Series</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="movie-grid">
      ${series.map(show => watchlistItemTemplate(show, "tv")).join("")}
    </div>
  `;

  attachRemoveListeners(series, "tv");
}

function watchlistItemTemplate(item, type) {
  const title = item.title || item.name || item.id;
  return `
    <div class="watchlist-item">
      <div class="watchlist-card">
        <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${title}" style="width: 100%; height: 225px; object-fit: cover; border-radius: 8px;" />
        <h3 style="margin-top: 0.8rem; font-size: 0.9rem;">${title}</h3>
        <div class="watchlist-buttons">
          <a href="./detail.html?id=${item.id}&type=${type}" class="btn-view-small">👁️ View</a>
          <button class="remove-btn btn-remove-icon" data-id="${item.id}" data-type="${type}" title="Remove from watchlist">✕</button>
        </div>
      </div>
    </div>
  `;
}

function attachRemoveListeners(items, type) {
  const removeButtons = document.querySelectorAll(".remove-btn");
  
  removeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const itemType = e.target.dataset.type;
      
      removeFromWatchlist(id, itemType);
      alertMessage(`Removed from Watchlist`);
      
      if (type === "movie") {
        displayMovies();
      } else {
        displaySeries();
      }
    });
  });
}

// Navegación a detalle desde watchlist
document.addEventListener("click", (event) => {
  const card = event.target.closest(".watchlist-card");
  if (card && !event.target.closest(".remove-btn") && !event.target.closest("a")) {
    // Solo navegar si no se hizo click en los botones
    // Los botones ya tienen su funcionalidad asignada vía template
  }
});
