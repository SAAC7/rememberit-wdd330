import{a as e,i as t,n,o as r,r as i,t as a}from"./utils-sP-aylHk.js";import{a as o,i as s,o as c,t as l}from"./api-tuEAaVl0.js";import{a as u,c as d,l as f,n as p,o as m,s as h,t as g,u as _}from"./watchlist-B7qon5tf.js";async function v(){let e=n(`id`),t=n(`type`)||`movie`;if(!e){console.error(`No ID found in URL`);return}try{let n=t===`tv`?await s(e):await l(e);t===`tv`?b(n):y(n)}catch(e){console.error(e),O()}}function y(e){document.title=`${e.title} | RememberIt`;let t=document.querySelector(`#movie-detail`),n=e.genres.map(e=>e.name).join(`, `),r=e.production_companies.map(e=>e.name).join(`, `),i=e.spoken_languages.map(e=>e.english_name).join(`, `);t.innerHTML=`
    <section class="hero" style="background-image: url('https://image.tmdb.org/t/p/original${e.backdrop_path}')">
      <div class="overlay">
        <h1>${e.title}</h1>
        <p class="tagline">${e.tagline||``}</p>
        <p class="rating">⭐ ${e.vote_average.toFixed(1)} (${e.vote_count})</p>
      </div>
    </section>

    <section class="details-container">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" />

      <div class="info">
        <p><strong>Overview:</strong> ${e.overview}</p>
        <p><strong>Genres:</strong> ${n}</p>
        <p><strong>Release:</strong> ${e.release_date}</p>
        <p><strong>Runtime:</strong> ${e.runtime} min</p>
        <p><strong>Status:</strong> ${e.status}</p>
        <p><strong>Language:</strong> ${i}</p>
        <p><strong>Budget:</strong> $${e.budget.toLocaleString()}</p>
        <p><strong>Revenue:</strong> $${e.revenue.toLocaleString()}</p>
        <p><strong>Companies:</strong> ${r}</p>
        
        ${e.homepage?`<a href="${e.homepage}" target="_blank" class="btn">Official Site</a>`:``}

        <button id="watchlist-btn" class="btn"></button>
      </div>
    </section>
  `;let o=document.getElementById(`watchlist-btn`);D(o,e.id,`movie`),o.addEventListener(`click`,()=>{h(e.id,`movie`)?(d(e.id,`movie`),a(`Removed from Watchlist`)):(g({id:e.id,title:e.title,poster_path:e.poster_path,type:`movie`}),a(`Added to Watchlist`)),D(o,e.id,`movie`)})}function b(e){document.title=`${e.name} | RememberIt`;let t=document.querySelector(`#movie-detail`);h(e.id,`tv`);let n=e.genres.map(e=>e.name).join(`, `);e.languages.join(`, `),t.innerHTML=`
    <section class="hero" style="background-image: url('https://image.tmdb.org/t/p/original${e.backdrop_path}')">
      <div class="overlay">
        <h1>${e.name}</h1>
        <p class="rating">⭐ ${e.vote_average.toFixed(1)} (${e.vote_count})</p>
      </div>
    </section>
    <section class="details-container">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.name}" />
      <div class="info">
        <p><strong>Overview:</strong> ${e.overview}</p>
        <p><strong>Genres:</strong> ${n}</p>
        <p><strong>First Air:</strong> ${e.first_air_date}</p>
        <p><strong>Seasons:</strong> ${e.number_of_seasons} | <strong>Episodes:</strong> ${e.number_of_episodes}</p>
        <p><strong>Status:</strong> ${e.status}</p>
        ${e.homepage?`<a href="${e.homepage}" target="_blank" class="btn">Official Site</a>`:``}
        <button id="watchlist-btn" class="btn"></button>
      </div>
    </section>

    <section class="tv-season-section">
      <h2>Seasons</h2>
      <div id="season-buttons" class="season-buttons">
        ${e.seasons.map(e=>`
          <button class="season-btn" data-season="${e.season_number}">
            ${e.name||`Season ${e.season_number}`} (${e.episode_count})
          </button>
        `).join(``)}
      </div>
      <div id="season-details" class="season-details"></div>
    </section>
  `;let r=document.getElementById(`watchlist-btn`);D(r,e.id,`tv`),r.addEventListener(`click`,()=>{if(h(e.id,`tv`))d(e.id,`tv`),a(`Removed from Watchlist`);else{g({id:e.id,title:e.name,poster_path:e.poster_path,type:`tv`,status:`to_watch`}),a(`Added to Watchlist`),location.reload();return}D(r,e.id,`tv`)}),x(e,r,e)}function x(e,t){let n=document.querySelectorAll(`.season-btn`);if(!n.length)return;n.forEach(r=>{r.addEventListener(`click`,async()=>{n.forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`),await S(e.id,Number(r.dataset.season),e,t)})});let r=n[0];r&&(r.classList.add(`active`),S(e.id,Number(r.dataset.season),e,t))}async function S(e,t,n,r){let i=document.getElementById(`season-details`);if(i){i.innerHTML=`<p class="loading-text">Loading episodes...</p>`;try{let a=await o(e,t);i.innerHTML=`
      <div class="season-header">
        <h3>${a.name||`Season ${a.season_number}`}</h3>
        <p>${a.overview||``}</p>
      </div>
      <div class="episode-list">
        ${a.episodes.map(t=>{let n=m(e,a.season_number,t.episode_number);return`
            <article class="episode-item">
              <div class="episode-meta">
                <strong>S${String(a.season_number).padStart(2,`0`)}E${String(t.episode_number).padStart(2,`0`)} - ${t.name}</strong>
                <p>${t.air_date||`TBA`}</p>
                ${t.overview?`<p class="episode-overview">${t.overview}</p>`:``}
              </div>
              <div class="episode-actions">
                <span class="episode-status ${n?`seen`:`unseen`}">${n?`Watched`:`Not watched`}</span>
                <button class="episode-watch-btn ${n?`watched`:``}" data-season="${a.season_number}" data-episode="${t.episode_number}">
                  ${n?`Mark unwatched`:`Mark watched`}
                </button>
              </div>
            </article>
          `}).join(``)}
      </div>
    `,E(n,r)}catch(e){console.error(e),i.innerHTML=`<p class="error-text">Unable to load season episodes.</p>`}}}function C(e){let t=p()[e]||{};return Object.values(t).reduce((e,t)=>e+Object.keys(t).length,0)}function w(e,t){let n=C(e);return n===0?`to_watch`:t>0&&n>=t?`watched`:`watching`}function T(e,t){let n=w(e.id,e.number_of_episodes||0);return h(e.id,`tv`)?_(e.id,n):g({id:e.id,title:e.name,poster_path:e.poster_path,type:`tv`,status:n}),t&&D(t,e.id,`tv`),n}function E(e,t){document.querySelectorAll(`.episode-watch-btn`).forEach(n=>{n.addEventListener(`click`,()=>{let r=Number(n.dataset.season),i=Number(n.dataset.episode),o=f(e.id,r,i),s=n.closest(`.episode-item`).querySelector(`.episode-status`);n.textContent=o?`Mark unwatched`:`Mark watched`,n.classList.toggle(`watched`,o),s&&(s.textContent=o?`Watched`:`Not watched`,s.classList.toggle(`seen`,o),s.classList.toggle(`unseen`,!o));let c=T(e,t);a(o?`Episode marked watched`:`Episode marked unwatched`),c===`watching`?a(`Series status: Watching`):c===`watched`&&a(`Series status: Watched`)})})}function D(e,t,n){h(t,n)?(e.textContent=`Remove from Watchlist`,e.style.background=`#555`):(e.textContent=`Add to Watchlist`,e.style.background=`#e50914`)}function O(){let e=document.querySelector(`#movie-detail`);e.innerHTML=`
    <p style="padding: 2rem; text-align: center;">Something went wrong loading the details.</p>
  `}var k=r((()=>{c(),i(),u()}));e((()=>{i(),k(),e();function e(){t(),v()}}))();