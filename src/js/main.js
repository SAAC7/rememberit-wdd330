import { loadHeaderFooter } from './utils.mjs';
import { initMovieList } from './mediaList.mjs';

init();

function init() {
  loadHeaderFooter();
  initMovieList();
  setupNavigation();
}

function setupNavigation() {
  document.addEventListener("click", (event) => {
    const base = import.meta.env.BASE_URL;
    const card = event.target.closest(".movie-card");
    if (card) {
      const id = card.dataset.id;
      const type = card.dataset.type || "movie";
      window.location.href = `${base}detail.html?id=${id}&type=${type}`;
    }
  });
}