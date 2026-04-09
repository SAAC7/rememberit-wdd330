import{a as e,c as t,i as n,l as r,o as i,r as a,s as o,t as s}from"./api-Cjq_b3j4.js";function c(){return JSON.parse(localStorage.getItem(p))||[]}function l(e){localStorage.setItem(p,JSON.stringify(e))}function u(e){let t=c();t.some(t=>t.id===e.id)||(t.push(e),l(t))}function d(e){l(c().filter(t=>t.id!==e))}function f(e){return c().some(t=>t.id===e)}var p,m=r((()=>{p=`movie-watchlist`}));async function h(){let t=e(`id`);if(!t){console.error(`No movie ID found in URL`);return}try{let e=await s(t);console.log(e),g(e)}catch(e){console.error(e),v()}}function g(e){document.title=`${e.title} | Movie Tracker`;let t=document.querySelector(`#movie-detail`),r=e.genres.map(e=>e.name).join(`, `),i=e.production_companies.map(e=>e.name).join(`, `),a=e.spoken_languages.map(e=>e.english_name).join(`, `);t.innerHTML=`
    <section class="hero" style="background-image: url('https://image.tmdb.org/t/p/original${e.backdrop_path}')">
      <div class="overlay">
        <h1>${e.title}</h1>
        <p class="tagline">${e.tagline||``}</p>
        <p class="rating">⭐ ${e.vote_average.toFixed(1)} (${e.vote_count})</p>
      </div>
    </section>

    <section class="details-container">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${e.poster_path}" />

      <div class="info">
        <p><strong>Overview:</strong> ${e.overview}</p>
        <p><strong>Genres:</strong> ${r}</p>
        <p><strong>Release:</strong> ${e.release_date}</p>
        <p><strong>Runtime:</strong> ${e.runtime} min</p>
        <p><strong>Status:</strong> ${e.status}</p>
        <p><strong>Language:</strong> ${a}</p>
        <p><strong>Budget:</strong> $${e.budget.toLocaleString()}</p>
        <p><strong>Revenue:</strong> $${e.revenue.toLocaleString()}</p>
        <p><strong>Companies:</strong> ${i}</p>
        
        ${e.homepage?`<a href="${e.homepage}" target="_blank" class="btn">Official Site</a>`:``}

        <button id="watchlist-btn" class="btn"></button>
      </div>
    </section>
  `;let o=document.getElementById(`watchlist-btn`);_(o,e.id),o.addEventListener(`click`,()=>{f(e.id)?(d(e.id),n(`Removed from Watchlist`)):(u({id:e.id,title:e.title,poster_path:e.poster_path}),n(`Added to Watchlist`)),_(o,e.id)})}function _(e,t){f(t)?(e.textContent=`Remove from Watchlist`,e.style.background=`#555`):(e.textContent=`Add to Watchlist`,e.style.background=`#e50914`)}function v(){let e=document.querySelector(`#movie-detail`);e.innerHTML=`
    <p>Something went wrong loading the movie details.</p>
  `}var y=r((()=>{a(),i(),m()}));t((()=>{i(),y(),e();function e(){o(),h()}}))();