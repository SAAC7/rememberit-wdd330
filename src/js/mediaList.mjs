import { getPopularMovies, getPopularSeries, searchMulti } from "./api.js";

let currentPageMovies = 1, currentPageSeries = 1;
let totalPagesMovies = 1, totalPagesSeries = 1;
let currentQuery = null;
let currentMode = "movies";

export async function initMovieList() {
  renderTabs();
  setupSearch();
  const urlState = getUrlState();
  const page = Number(urlState.page) || 1;

  if (urlState.q) {
    document.querySelector("#search-input").value = urlState.q;
    await search(urlState.q, page);
  } else if (urlState.mode === "series") {
    await loadSeries(page);
  } else {
    await loadMovies(page);
  }
}

export async function search(query, page = 1) {
  currentQuery = query.trim();
  if (!currentQuery) {
    const type = getSessionType();
    if (type === "movies") await loadMovies(1);
    else await loadSeries(1);
    return;
  }
  currentMode = "search";
  setUrlState({ q: currentQuery, page, mode: currentMode });
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

function getUrlState() {
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") || "",
    page: params.get("page") || "1",
    mode: params.get("mode") || "movies"
  };
}

function setUrlState({ q = "", page = 1, mode = "movies" }) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page) params.set("page", page);
  if (mode) params.set("mode", mode);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.replaceState(null, "", newUrl);
}

function setActiveTab(type) {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => {
    btn.style.background = "#333";
  });
  const active = document.querySelector(type === "series" ? "#tab-series" : "#tab-movies");
  if (active) active.style.background = "#e50914";
}

async function loadMovies(page) {
  currentMode = "movies";
  updateSessionType("movies");
  setUrlState({ page, mode: currentMode });
  const data = await getPopularMovies(page);
  const { results, totalPages: tp, currentPage: cp } = data;
  
  currentPageMovies = cp;
  totalPagesMovies = tp;
  
  renderMedia(results, "movie");
  renderPagination("movies", cp, tp);
  setActiveTab("movies");
}

async function loadSeries(page) {
  currentMode = "series";
  updateSessionType("series");
  setUrlState({ page, mode: currentMode });
  const data = await getPopularSeries(page);
  const { results, totalPages: tp, currentPage: cp } = data;
  
  currentPageSeries = cp;
  totalPagesSeries = tp;
  
  renderMedia(results, "tv");
  renderPagination("series", cp, tp);
  setActiveTab("series");
}

function renderMedia(items, type) {
  const container = document.querySelector("#movie-list");
  console.log("Rendering media:", items);
  container.innerHTML = items.map(item => {
    const itemType = item.media_type || type;
    const title = itemType === "tv" ? item.name : item.title;
    const postPath = item.poster_path;
    const badgeText = itemType === "tv" ? "TV Show" : "Movie";
    return `
      <div class="movie-card" data-id="${item.id}" data-type="${itemType}">
        <img src="https://image.tmdb.org/t/p/w300${postPath}" alt="${title}" />
        <span class="media-type-badge ${itemType}">${badgeText}</span>
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
      if (type === "search") {
        search(currentQuery, currentPage - 1);
      } else if (type === "movies") {
        loadMovies(currentPage - 1);
      } else {
        loadSeries(currentPage - 1);
      }
    }
  });

  document.querySelector("#next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
      if (type === "search") {
        search(currentQuery, currentPage + 1);
      } else if (type === "movies") {
        loadMovies(currentPage + 1);
      } else {
        loadSeries(currentPage + 1);
      }
    }
  });
}