import { loadHeaderFooter } from "./utils.mjs";
import { getWatchlist, removeFromWatchlist, getMoviesFromWatchlist, getSeriesFromWatchlist, updateSeriesStatus } from "./watchlist.js";
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

  moviesTab?.addEventListener("click", () => {
    updateActiveTab(moviesTab, seriesTab);
    displayMovies();
  });

  seriesTab?.addEventListener("click", () => {
    updateActiveTab(seriesTab, moviesTab);
    displaySeries();
  });
}

function updateActiveTab(activeBtn, inactiveBtn) {
  activeBtn.classList.add("active");
  inactiveBtn.classList.remove("active");
}

function displayMovies() {
  const movies = getMoviesFromWatchlist();
  const container = document.querySelector("#watchlist-content");

  if (movies.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:3rem;color:#999;"><p>No movies yet</p><a href="./index.html" class="btn" style="display:inline-block;margin-top:1rem;">Browse Movies</a></div>`;
    return;
  }

  container.innerHTML = `<div class="movie-grid">${movies.map(m => watchlistItemTemplate(m, "movie")).join("")}</div>`;
  attachRemoveListeners("movie");
}

function displaySeries() {
  const series = getSeriesFromWatchlist();
  const container = document.querySelector("#watchlist-content");

  if (series.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:3rem;color:#999;"><p>No series yet</p><a href="./index.html" class="btn" style="display:inline-block;margin-top:1rem;">Browse Series</a></div>`;
    return;
  }

  // Filtros de estado
  const filtersHTML = `
    <div class="status-bar">
      <button class="status-filter active" data-status="all">All</button>
      <button class="status-filter" data-status="to_watch">To Watch</button>
      <button class="status-filter" data-status="watching">Watching</button>
      <button class="status-filter" data-status="watched">Watched</button>
    </div>
  `;

  const gridHTML = `<div class="movie-grid" id="series-grid">${series.map(s => watchlistItemTemplate(s, "tv")).join("")}</div>`;
  container.innerHTML = filtersHTML + gridHTML;

  // Listeners para filtros
  document.querySelectorAll(".status-filter").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".status-filter").forEach(b => { b.style.background = "#333"; b.classList.remove("active"); });
      e.target.style.background = "#e50914";
      e.target.classList.add("active");
      filterSeries(e.target.dataset.status);
    });
  });

  attachRemoveListeners("tv");
}

function filterSeries(status) {
  const series = status === "all" ? getSeriesFromWatchlist() : getSeriesFromWatchlist().filter(s => s.status === status);
  const grid = document.getElementById("series-grid");
  if (series.length === 0) {
    grid.innerHTML = `<p style="text-align:center;color:#999;padding:2rem;">No series in this category</p>`;
  } else {
    grid.innerHTML = series.map(s => watchlistItemTemplate(s, "tv")).join("");
    attachRemoveListeners("tv");
  }
}

function watchlistItemTemplate(item, type) {
  const title = item.title || item.name || item.id;
  const statusBadge = type === "tv" && item.status
    ? `<div class="watchlist-status-row"><span class="status-badge" style="background:${getStatusColor(item.status)}">${item.status.replace("_", " ")}</span></div>`
    : "";

  return `
    <div class="watchlist-item">
      <div class="watchlist-card">
        <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${title}" />
        <h3>${title}</h3>
        ${statusBadge}
        <div class="watchlist-buttons">
          <a href="./detail.html?id=${item.id}&type=${type}" class="btn-view-small">View</a>
          <button class="remove-btn btn-remove-icon" data-id="${item.id}" data-type="${type}" title="Remove">✕</button>
        </div>
      </div>
    </div>
  `;
}

function getStatusColor(status) {
  if (status === "to_watch") return "#555";
  if (status === "watching") return "#e50914";
  if (status === "watched") return "#28a745";
  return "#333";
}

function attachRemoveListeners() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(e.target.dataset.id);
      const type = e.target.dataset.type;
      removeFromWatchlist(id, type);
      alertMessage("Removed from Watchlist");
      type === "movie" ? displayMovies() : displaySeries();
    });
  });
}
