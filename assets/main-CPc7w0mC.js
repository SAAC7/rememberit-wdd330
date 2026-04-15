import{a as e,i as t,o as n,r}from"./utils-sP-aylHk.js";import{n as i,o as a,r as o,s}from"./api-tuEAaVl0.js";async function c(){d(),u();let e=h(),t=Number(e.page)||1;e.q?(document.querySelector(`#search-input`).value=e.q,await l(e.q,t)):e.mode===`series`?await y(t):await v(t)}async function l(e,t=1){if(S=e.trim(),!S){p()===`movies`?await v(1):await y(1);return}C=`search`,g({q:S,page:t,mode:C});let n=await s(S,t);b(n.results,n.results[0]?.media_type||`movie`),x(`search`,n.currentPage,n.totalPages)}function u(){let e=document.querySelector(`#search-input`),t=document.querySelector(`#search-btn`);!e||!t||(t.addEventListener(`click`,()=>l(e.value)),e.addEventListener(`keypress`,t=>{t.key===`Enter`&&l(e.value)}))}function d(){let e=document.querySelector(`#section-title`),t=document.createElement(`div`);t.id=`media-tabs`,t.style.cssText=`
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
  `,e.parentElement.insertBefore(t,e.nextElementSibling),document.querySelector(`#tab-movies`).addEventListener(`click`,f),document.querySelector(`#tab-series`).addEventListener(`click`,f)}function f(e){document.querySelectorAll(`.tab-btn`).forEach(e=>{e.style.background=`#333`}),e.target.style.background=`#e50914`,(e.target.id===`tab-movies`?`movies`:`series`)==`movies`?(m(`movies`),v(1)):(m(`series`),y(1))}function p(){return sessionStorage.getItem(`mediaType`)||`movies`}function m(e){sessionStorage.setItem(`mediaType`,e)}function h(){let e=new URLSearchParams(window.location.search);return{q:e.get(`q`)||``,page:e.get(`page`)||`1`,mode:e.get(`mode`)||`movies`}}function g({q:e=``,page:t=1,mode:n=`movies`}){let r=new URLSearchParams;e&&r.set(`q`,e),t&&r.set(`page`,t),n&&r.set(`mode`,n);let i=`${window.location.pathname}?${r.toString()}`;history.replaceState(null,``,i)}function _(e){document.querySelectorAll(`.tab-btn`).forEach(e=>{e.style.background=`#333`});let t=document.querySelector(e===`series`?`#tab-series`:`#tab-movies`);t&&(t.style.background=`#e50914`)}async function v(e){C=`movies`,m(`movies`),g({page:e,mode:C});let{results:t,totalPages:n,currentPage:r}=await i(e);b(t,`movie`),x(`movies`,r,n),_(`movies`)}async function y(e){C=`series`,m(`series`),g({page:e,mode:C});let{results:t,totalPages:n,currentPage:r}=await o(e);b(t,`tv`),x(`series`,r,n),_(`series`)}function b(e,t){let n=document.querySelector(`#movie-list`);console.log(`Rendering media:`,e),n.innerHTML=e.map(e=>{let n=e.media_type||t,r=n===`tv`?e.name:e.title,i=e.poster_path,a=n===`tv`?`TV Show`:`Movie`;return`
      <div class="movie-card" data-id="${e.id}" data-type="${n}">
        <img src="https://image.tmdb.org/t/p/w300${i}" alt="${r}" />
        <span class="media-type-badge ${n}">${a}</span>
        <h3>${r}</h3>
      </div>
    `}).join(``)}function x(e,t,n){let r=document.querySelector(`#pagination`);r.innerHTML=`
    <button id="prev-page" ${t===1?`disabled`:``}>Previous</button>
    <span>Page ${t} of ${n}</span>
    <button id="next-page" ${t===n?`disabled`:``}>Next</button>
  `,document.querySelector(`#prev-page`).addEventListener(`click`,()=>{t>1&&(e===`search`?l(S,t-1):e===`movies`?v(t-1):y(t-1))}),document.querySelector(`#next-page`).addEventListener(`click`,()=>{t<n&&(e===`search`?l(S,t+1):e===`movies`?v(t+1):y(t+1))})}var S,C,w=n((()=>{a(),S=null,C=`movies`}));e((()=>{r(),w(),e();function e(){t(),c(),n()}function n(){document.addEventListener(`click`,e=>{let t=e.target.closest(`.movie-card`);if(t){let e=t.dataset.id,n=t.dataset.type||`movie`;window.location.href=`/rememberit-wdd330/detail.html?id=${e}&type=${n}`}})}}))();