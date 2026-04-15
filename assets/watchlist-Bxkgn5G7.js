import{a as e,i as t,r as n,t as r}from"./utils-sP-aylHk.js";import{a as i,c as a,i as o,r as s}from"./watchlist-B7qon5tf.js";e((()=>{n(),i(),e();function e(){t(),c(),u()}function c(){let e=document.querySelector(`#tab-watchlist-movies`),t=document.querySelector(`#tab-watchlist-series`);e?.addEventListener(`click`,()=>{l(e,t),u()}),t?.addEventListener(`click`,()=>{l(t,e),d()})}function l(e,t){e.classList.add(`active`),t.classList.remove(`active`)}function u(){let e=s(),t=document.querySelector(`#watchlist-content`);if(e.length===0){t.innerHTML=`<div style="text-align:center;padding:3rem;color:#999;"><p>No movies yet</p><a href="./index.html" class="btn" style="display:inline-block;margin-top:1rem;">Browse Movies</a></div>`;return}t.innerHTML=`<div class="movie-grid">${e.map(e=>p(e,`movie`)).join(``)}</div>`,h(`movie`)}function d(){let e=o(),t=document.querySelector(`#watchlist-content`);if(e.length===0){t.innerHTML=`<div style="text-align:center;padding:3rem;color:#999;"><p>No series yet</p><a href="./index.html" class="btn" style="display:inline-block;margin-top:1rem;">Browse Series</a></div>`;return}t.innerHTML=`
    <div class="status-bar">
      <button class="status-filter active" data-status="all">All</button>
      <button class="status-filter" data-status="to_watch">To Watch</button>
      <button class="status-filter" data-status="watching">Watching</button>
      <button class="status-filter" data-status="watched">Watched</button>
    </div>
  <div class="movie-grid" id="series-grid">${e.map(e=>p(e,`tv`)).join(``)}</div>`,document.querySelectorAll(`.status-filter`).forEach(e=>{e.addEventListener(`click`,e=>{document.querySelectorAll(`.status-filter`).forEach(e=>{e.style.background=`#333`,e.classList.remove(`active`)}),e.target.style.background=`#e50914`,e.target.classList.add(`active`),f(e.target.dataset.status)})}),h(`tv`)}function f(e){let t=e===`all`?o():o().filter(t=>t.status===e),n=document.getElementById(`series-grid`);t.length===0?n.innerHTML=`<p style="text-align:center;color:#999;padding:2rem;">No series in this category</p>`:(n.innerHTML=t.map(e=>p(e,`tv`)).join(``),h(`tv`))}function p(e,t){let n=e.title||e.name||e.id,r=t===`tv`&&e.status?`<div class="watchlist-status-row"><span class="status-badge" style="background:${m(e.status)}">${e.status.replace(`_`,` `)}</span></div>`:``;return`
    <div class="watchlist-item">
      <div class="watchlist-card">
        <img src="https://image.tmdb.org/t/p/w300${e.poster_path}" alt="${n}" />
        <h3>${n}</h3>
        ${r}
        <div class="watchlist-buttons">
          <a href="./detail.html?id=${e.id}&type=${t}" class="btn-view-small">View</a>
          <button class="remove-btn btn-remove-icon" data-id="${e.id}" data-type="${t}" title="Remove">✕</button>
        </div>
      </div>
    </div>
  `}function m(e){return e===`to_watch`?`#555`:e===`watching`?`#e50914`:e===`watched`?`#28a745`:`#333`}function h(){document.querySelectorAll(`.remove-btn`).forEach(e=>{e.addEventListener(`click`,e=>{e.stopPropagation();let t=parseInt(e.target.dataset.id),n=e.target.dataset.type;a(t,n),r(`Removed from Watchlist`),n===`movie`?u():d()})})}}))();