import{a as e,i as t,r as n,t as r}from"./utils-CxqJ1-G2.js";import{i,n as a,o,r as s}from"./watchlist-DWssqR59.js";e((()=>{n(),i(),e();function e(){t(),c(),u()}function c(){let e=document.querySelector(`#tab-watchlist-movies`),t=document.querySelector(`#tab-watchlist-series`);e.addEventListener(`click`,()=>{l(e,t),u()}),t.addEventListener(`click`,()=>{l(t,e),d()})}function l(e,t){e.style.background=`#e50914`,t.style.background=`#333`}function u(){let e=a(),t=document.querySelector(`#watchlist-content`);if(e.length===0){t.innerHTML=`
      <div style="text-align: center; padding: 3rem; color: #999;">
        <p>No movies in your watchlist yet</p>
        <a href="./index.html" class="btn" style="display: inline-block; margin-top: 1rem;">Start Adding Movies</a>
      </div>
    `;return}t.innerHTML=`
    <div class="movie-grid">
      ${e.map(e=>f(e,`movie`)).join(``)}
    </div>
  `,p(e,`movie`)}function d(){let e=s(),t=document.querySelector(`#watchlist-content`);if(e.length===0){t.innerHTML=`
      <div style="text-align: center; padding: 3rem; color: #999;">
        <p>No series in your watchlist yet</p>
        <a href="./index.html" class="btn" style="display: inline-block; margin-top: 1rem;">Start Adding Series</a>
      </div>
    `;return}t.innerHTML=`
    <div class="movie-grid">
      ${e.map(e=>f(e,`tv`)).join(``)}
    </div>
  `,p(e,`tv`)}function f(e,t){let n=e.title||e.name||e.id;return`
    <div class="watchlist-item">
      <div class="watchlist-card">
        <img src="https://image.tmdb.org/t/p/w300${e.poster_path}" alt="${n}" style="width: 100%; height: 225px; object-fit: cover; border-radius: 8px;" />
        <h3 style="margin-top: 0.8rem; font-size: 0.9rem;">${n}</h3>
        <div class="watchlist-buttons">
          <a href="./detail.html?id=${e.id}&type=${t}" class="btn-view-small">👁️ View</a>
          <button class="remove-btn btn-remove-icon" data-id="${e.id}" data-type="${t}" title="Remove from watchlist">✕</button>
        </div>
      </div>
    </div>
  `}function p(e,t){document.querySelectorAll(`.remove-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let n=parseInt(e.target.dataset.id),i=e.target.dataset.type;o(n,i),r(`Removed from Watchlist`),t===`movie`?u():d()})})}document.addEventListener(`click`,e=>{e.target.closest(`.watchlist-card`)&&!e.target.closest(`.remove-btn`)&&e.target.closest(`a`)})}))();