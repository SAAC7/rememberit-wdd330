import{a as e,i as t,o as n,r}from"./utils-CxqJ1-G2.js";import{a as i,n as a,r as o}from"./api-BkBU9txP.js";async function s(){c(),await d(1)}function c(){let e=document.querySelector(`#section-title`),t=document.createElement(`div`);t.id=`media-tabs`,t.style.cssText=`
    display: flex; 
    gap: 1rem; 
    padding: 1rem; 
    justify-content: center; 
    border-bottom: 2px solid #333;
    margin-bottom: 1rem;
  `,t.innerHTML=`
    <button id="tab-movies" class="tab-btn" style="background: #e50914; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer;">
      🎬 Movies
    </button>
    <button id="tab-series" class="tab-btn" style="background: #333; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer;">
      📺 Series
    </button>
  `,e.parentElement.insertBefore(t,e.nextElementSibling),document.querySelector(`#tab-movies`).addEventListener(`click`,l),document.querySelector(`#tab-series`).addEventListener(`click`,l)}function l(e){document.querySelectorAll(`.tab-btn`).forEach(e=>{e.style.background=`#333`}),e.target.style.background=`#e50914`,(e.target.id===`tab-movies`?`movies`:`series`)==`movies`?(u(`movies`),d(1)):(u(`series`),f(1))}function u(e){sessionStorage.setItem(`mediaType`,e)}async function d(e){u(`movies`);let{results:t,totalPages:n,currentPage:r}=await a(e);p(t,`movie`),h(`movies`,r,n)}async function f(e){u(`series`);let{results:t,totalPages:n,currentPage:r}=await o(e);p(t,`tv`),h(`series`,r,n)}function p(e,t){let n=document.querySelector(`#movie-list`);n.innerHTML=e.map(e=>m(e,t)).join(``)}function m(e,t){let n=t===`movie`?e.title:e.name,r=e.poster_path;return`
    <div class="movie-card" data-id="${e.id}" data-type="${t}">
      <img src="https://image.tmdb.org/t/p/w300${r}" alt="${n}" />
      <h3>${n}</h3>
    </div>
  `}function h(e,t,n){let r=document.querySelector(`#pagination`);r.innerHTML=`
    <button id="prev-page" ${t===1?`disabled`:``}>Previous</button>
    <span>Page ${t} of ${n}</span>
    <button id="next-page" ${t===n?`disabled`:``}>Next</button>
  `,document.querySelector(`#prev-page`).addEventListener(`click`,()=>{t>1&&(e===`movies`?d(t-1):f(t-1))}),document.querySelector(`#next-page`).addEventListener(`click`,()=>{t<n&&(e===`movies`?d(t+1):f(t+1))})}var g=n((()=>{i()}));e((()=>{r(),g(),e();function e(){t(),s()}document.addEventListener(`click`,e=>{let t=e.target.closest(`.movie-card`);if(t){let e=t.dataset.id,n=t.dataset.type||`movie`;window.location.href=`/rememberit-wdd330/detail.html?id=${e}&type=${n}`}})}))();