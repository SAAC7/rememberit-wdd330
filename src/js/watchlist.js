const KEY = "movie-watchlist";

export function getWatchlist() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveWatchlist(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addToWatchlist(movie) {
  const list = getWatchlist();

  // evitar duplicados
  const exists = list.some(item => item.id === movie.id);
  if (exists) return;

  list.push(movie);
  saveWatchlist(list);
}

export function removeFromWatchlist(id) {
  const list = getWatchlist().filter(item => item.id !== id);
  saveWatchlist(list);
}

export function isInWatchlist(id) {
  const list = getWatchlist();
  return list.some(item => item.id === id);
}