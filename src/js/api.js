const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// ========================
// MOVIES
// ========================
export async function getPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  const data = await res.json();

  return {
    results: data.results,
    totalPages: data.total_pages,
    currentPage: data.page
  };
}

export async function getMovieById(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Error fetching movie details");
  }

  return await res.json();
}

// ========================
// TV SERIES
// ========================
export async function getPopularSeries(page = 1) {
  const res = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  const data = await res.json();

  return {
    results: data.results,
    totalPages: data.total_pages,
    currentPage: data.page
  };
}

export async function getTVById(id) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Error fetching TV details");
  }

  return await res.json();
}

export async function getTVSeasonDetails(tvId, seasonNumber) {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Error fetching TV season details");
  }

  return await res.json();
}

// Búsqueda multi (películas y series)
export async function searchMulti(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );

  if (!res.ok) throw new Error("Search error");

  const data = await res.json();
  const results = data.results.filter(item =>
    item.media_type === "movie" || item.media_type === "tv"
  );

  return {
    results,
    totalPages: data.total_pages,
    currentPage: data.page
  };
}