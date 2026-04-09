import { loadHeaderFooter } from './utils.mjs';
import { initMovieList } from './mediaList.mjs';

init();

function init() {
  loadHeaderFooter();
  initMovieList();
}

// navegación a detalle
document.addEventListener("click", (event) => {
  const base = import.meta.env.BASE_URL;

  const card = event.target.closest(".movie-card");
  if (card) {
    const id = card.dataset.id;
    window.location.href = `${base}detail.html?id=${id}`;
  }
});