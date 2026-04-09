import{c as e,l as t,n,o as r,r as i,s as a}from"./api-Cjq_b3j4.js";async function o(){await s(1)}async function s(e){let{movies:t,totalPages:r,currentPage:i}=await n(e);d=i,f=r,c(t),u()}function c(e){let t=document.querySelector(`#movie-list`);t.innerHTML=e.map(l).join(``)}function l(e){return`
    <div class="movie-card" data-id="${e.id}">
      <img src="https://image.tmdb.org/t/p/w300${e.poster_path}" />
      <h3>${e.title}</h3>
    </div>
  `}function u(){let e=document.querySelector(`#pagination`);e.innerHTML=`
    <button id="prev-page" ${d===1?`disabled`:``}>Previous</button>
    <span>Page ${d} of ${f}</span>
    <button id="next-page" ${d===f?`disabled`:``}>Next</button>
  `,document.querySelector(`#prev-page`).addEventListener(`click`,()=>{d>1&&s(d-1)}),document.querySelector(`#next-page`).addEventListener(`click`,()=>{d<f&&s(d+1)})}var d,f,p=t((()=>{i(),d=1,f=1}));e((()=>{r(),p(),e();function e(){a(),o()}document.addEventListener(`click`,e=>{let t=e.target.closest(`.movie-card`);if(t){let e=t.dataset.id;window.location.href=`/rememberit-wdd330/detail.html?id=${e}`}})}))();