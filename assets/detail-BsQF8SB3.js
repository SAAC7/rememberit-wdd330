import{a as e,i as t,n,o as r,r as i,t as a}from"./utils-CxqJ1-G2.js";import{a as o,i as s,t as c}from"./api-BkBU9txP.js";import{a as l,i as u,o as d,t as f}from"./watchlist-DWssqR59.js";async function p(){let e=n(`id`),t=n(`type`)||`movie`;if(!e){console.error(`No ID found in URL`);return}try{let n=t===`tv`?await s(e):await c(e);console.log(n),t===`tv`?h(n):m(n)}catch(e){console.error(e),_()}}function m(e){document.title=`${e.title} | RememberIt`;let t=document.querySelector(`#movie-detail`),n=e.genres.map(e=>e.name).join(`, `),r=e.production_companies.map(e=>e.name).join(`, `),i=e.spoken_languages.map(e=>e.english_name).join(`, `);t.innerHTML=`
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
  `;let o=document.getElementById(`watchlist-btn`);g(o,e.id,`movie`),o.addEventListener(`click`,()=>{l(e.id,`movie`)?(d(e.id,`movie`),a(`Removed from Watchlist`)):(f({id:e.id,title:e.title,poster_path:e.poster_path,type:`movie`}),a(`Added to Watchlist`)),g(o,e.id,`movie`)})}function h(e){document.title=`${e.name} | RememberIt`;let t=document.querySelector(`#movie-detail`),n=e.genres.map(e=>e.name).join(`, `),r=e.networks.map(e=>e.name).join(`, `),i=e.languages.join(`, `),o=e.seasons.map((e,t)=>`
    <div class="season-item">
      <h4>Season ${e.season_number}</h4>
      <p>Episodes: ${e.episode_count}</p>
      ${e.air_date?`<p>Aired: ${e.air_date}</p>`:``}
    </div>
  `).join(``);t.innerHTML=`
    <section class="hero" style="background-image: url('https://image.tmdb.org/t/p/original${e.backdrop_path}')">
      <div class="overlay">
        <h1>${e.name}</h1>
        <p class="tagline">${e.tagline||``}</p>
        <p class="rating">⭐ ${e.vote_average.toFixed(1)} (${e.vote_count})</p>
      </div>
    </section>

    <section class="details-container">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.name}" />

      <div class="info">
        <p><strong>Overview:</strong> ${e.overview}</p>
        <p><strong>Genres:</strong> ${n}</p>
        <p><strong>First Air Date:</strong> ${e.first_air_date}</p>
        <p><strong>Total Seasons:</strong> ${e.number_of_seasons}</p>
        <p><strong>Total Episodes:</strong> ${e.number_of_episodes}</p>
        <p><strong>Status:</strong> ${e.status}</p>
        <p><strong>Language:</strong> ${i}</p>
        <p><strong>Networks:</strong> ${r}</p>
        
        ${e.homepage?`<a href="${e.homepage}" target="_blank" class="btn">Official Site</a>`:``}

        <button id="watchlist-btn" class="btn"></button>
      </div>
    </section>

    <section class="seasons-section" style="padding: 2rem; max-width: 1100px; margin: auto;">
      <h2>Seasons</h2>
      <div class="seasons-grid">
        ${o}
      </div>
    </section>
  `;let s=document.createElement(`style`);s.textContent=`
    .seasons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .season-item {
      background: #222;
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid #e50914;
    }
    .season-item h4 {
      margin-top: 0;
      color: #e50914;
    }
    .season-item p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
  `,document.head.appendChild(s);let c=document.getElementById(`watchlist-btn`);g(c,e.id,`tv`),c.addEventListener(`click`,()=>{l(e.id,`tv`)?(d(e.id,`tv`),a(`Removed from Watchlist`)):(f({id:e.id,title:e.name,poster_path:e.poster_path,type:`tv`}),a(`Added to Watchlist`)),g(c,e.id,`tv`)})}function g(e,t,n){l(t,n)?(e.textContent=`Remove from Watchlist`,e.style.background=`#555`):(e.textContent=`Add to Watchlist`,e.style.background=`#e50914`)}function _(){let e=document.querySelector(`#movie-detail`);e.innerHTML=`
    <p style="padding: 2rem; text-align: center;">Something went wrong loading the details.</p>
  `}var v=r((()=>{o(),i(),u()}));e((()=>{i(),v(),e();function e(){t(),p()}}))();