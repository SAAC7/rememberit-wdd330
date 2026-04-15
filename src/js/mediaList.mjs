import { getPopularMovies, getPopularSeries, searchMulti } from "./api.js";

let currentPageMovies = 1, currentPageSeries = 1;
let totalPagesMovies = 1, totalPagesSeries = 1;
let currentQuery = null;

export async function initMovieList() {
  renderTabs();
  setupSearch();
  await loadMovies(1);
}

export async function search(query, page = 1) {
  currentQuery = query.trim();
  if (!currentQuery) {
    const type = getSessionType();
    type === "movies" ? loadMovies(1) : loadSeries(1);
    return;
  }
  const data = await searchMulti(currentQuery, page);
  renderMedia(data.results, data.results[0]?.media_type || "movie");
  renderPagination("search", data.currentPage, data.totalPages);
}

function setupSearch() {
  const input = document.querySelector("#search-input");
  const btn = document.querySelector("#search-btn");
  if (!input || !btn) return;

  btn.addEventListener("click", () => search(input.value));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") search(input.value);
  });
}

function renderTabs() {
  const sectionTitle = document.querySelector("#section-title");
  const tabs = document.createElement("div");
  tabs.id = "media-tabs";
  tabs.style.cssText = `
    display: flex; 
    gap: 1rem; 
    padding: 1rem; 
    justify-content: center; 
    border-bottom: 2px solid #333;
    margin-bottom: 1rem;
  `;
  
  tabs.innerHTML = `
    <button id="tab-movies" class="tab-btn" style="background: #e50914; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer;">
      🎬 Movies
    </button>
    <button id="tab-series" class="tab-btn" style="background: #333; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer;">
      📺 Series
    </button>
  `;
  
  sectionTitle.parentElement.insertBefore(tabs, sectionTitle.nextElementSibling);
  
  document.querySelector("#tab-movies").addEventListener("click", handleTabChange);
  document.querySelector("#tab-series").addEventListener("click", handleTabChange);
}

function handleTabChange(event) {
  const allButtons = document.querySelectorAll(".tab-btn");
  allButtons.forEach(btn => {
    btn.style.background = "#333";
  });
  
  event.target.style.background = "#e50914";
  const tabType = event.target.id === "tab-movies" ? "movies" : "series";
  
  if (tabType === "movies") {
    updateSessionType("movies");
    loadMovies(1);
  } else {
    updateSessionType("series");
    loadSeries(1);
  }
}

function getSessionType() {
  return sessionStorage.getItem("mediaType") || "movies";
}

function updateSessionType(type) {
  sessionStorage.setItem("mediaType", type);
}

async function loadMovies(page) {
  updateSessionType("movies");
  const data = await getPopularMovies(page);
  const { results, totalPages: tp, currentPage: cp } = data;
  
  currentPageMovies = cp;
  totalPagesMovies = tp;
  
  renderMedia(results, "movie");
  renderPagination("movies", cp, tp);
}

async function loadSeries(page) {
  updateSessionType("series");
  const data = await getPopularSeries(page);
  const { results, totalPages: tp, currentPage: cp } = data;
  
  currentPageSeries = cp;
  totalPagesSeries = tp;
  
  renderMedia(results, "tv");
  renderPagination("series", cp, tp);
}

function renderMedia(items, type) {
  const container = document.querySelector("#movie-list");
  container.innerHTML = items.map(item => {
    const itemType = item.media_type || type;
    const title = itemType === "tv" ? item.name : item.title;
    const postPath = item.poster_path;
    return `
      <div class="movie-card" data-id="${item.id}" data-type="${itemType}">
        <img src="https://image.tmdb.org/t/p/w300${postPath}" alt="${title}" />
        <h3>${title}</h3>
      </div>
    `;
  }).join("");
}

function renderPagination(type, currentPage, totalPages) {
  const container = document.querySelector("#pagination");

  container.innerHTML = `
    <button id="prev-page" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button id="next-page" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
  `;

  document.querySelector("#prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      type === "movies" ? loadMovies(currentPage - 1) : loadSeries(currentPage - 1);
    }
  });

  document.querySelector("#next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
      type === "movies" ? loadMovies(currentPage + 1) : loadSeries(currentPage + 1);
    }
  });
}