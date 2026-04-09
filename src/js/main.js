import { loadHeaderFooter } from './utils.mjs';
import { initMovieList } from './mediaList.mjs';

init();

function init() {
  loadHeaderFooter();
  initMovieList();
}

// navegación a detalle
document.addEventListener("click", (event) => {
  const card = event.target.closest(".movie-card");
  if (card) {
    const id = card.dataset.id;
    window.location.href = `detail.html?id=${id}`;
  }
});