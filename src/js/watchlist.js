const KEY = "media-watchlist";

export function getWatchlist() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveWatchlist(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addToWatchlist(media) {
  const list = getWatchlist();

  // evitar duplicados
  const exists = list.some(item => item.id === media.id && item.type === media.type);
  if (exists) return;

  list.push(media);
  saveWatchlist(list);
}

export function removeFromWatchlist(id, type = "movie") {
  const list = getWatchlist().filter(item => !(item.id === id && item.type === type));
  saveWatchlist(list);
}

export function isInWatchlist(id, type = "movie") {
  const list = getWatchlist();
  return list.some(item => item.id === id && item.type === type);
}

export function getMoviesFromWatchlist() {
  return getWatchlist().filter(item => item.type === "movie");
}

export function getSeriesFromWatchlist() {
  return getWatchlist().filter(item => item.type === "tv");
}

// Estados para series: por_ver, viendo, vista
export function updateSeriesStatus(id, status) {
  const list = getWatchlist();
  const item = list.find(i => i.id === id && i.type === "tv");
  if (item) {
    item.status = status;
    saveWatchlist(list);
  }
}

export function getSeriesByStatus(status) {
  return getSeriesFromWatchlist().filter(item => item.status === status);
}

// Verificar si serie está completa (todas las temporadas vistas)
export function checkSeriesCompletion(id, watchedSeasons) {
  const list = getWatchlist();
  const item = list.find(i => i.id === id && i.type === "tv");
  if (item && item.number_of_seasons) {
    const allWatched = watchedSeasons.length >= item.number_of_seasons;
    if (allWatched) updateSeriesStatus(id, "watched");
    return allWatched;
  }
  return false;
}