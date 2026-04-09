import { loadHeaderFooter } from "./utils.mjs";
import { initMovieDetails } from "./mediaDetails.mjs";

init();

function init() {
  loadHeaderFooter();
  initMovieDetails();
}