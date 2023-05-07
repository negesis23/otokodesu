let ongoingSection = document.querySelector("#ongoing-section");
let completedSection = document.querySelector("#completed-section");
let loadingSpinner1 = document.querySelector("#loading-spinner1");
let loadingSpinner2 = document.querySelector("#loading-spinner2");
let loadingSpinner3 = document.querySelector("#loading-spinner3");

let epsRegex = /(Special|OVA)?\sEpisode\s[0-9]+(\.[0-9]+)?\s[(End)]*|(OVA|Special)(\s[0-9]+(\.[0-9]+)?)?/gi;

var getAnime = {
 home: function() {
  fetch("https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/home").then((r)=>r.json()).then((j) => {
   loadingSpinner1.remove();
   loadingSpinner2.remove();
   //ongoingSection
   j.data.ongoing_anime.forEach((i)=> {
    let li = document.createElement("li");
    li.style.animation = "fadeInUp .4s ease-in-out";
    li.innerHTML = `<a href="/anime/?slug=${i.slug}" class="flex flex-row items-center" alt="${i.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${i.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-28 bg-[hsla(var(--bc)_/_0.1)] rounded-l-box  hover:contrast-125 duration-150" height="112" width="79.24">
    <div class="flex-col flex justify-center gap-1 pl-3.5 pr-2 bg-base-100 rounded-r-box w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-28 transition ease-in-out duration-150 border-y border-r border-[hsla(var(--bc)_/_0.2)]">
    <span class="flex flex-row gap-1 items-center "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" /></svg> ${i.current_episode}</span>
    <h3 class="font-medium text-lg line-clamp-1">${i.title}</h3>
    <span class="">${i.newest_release_date} • ${i.release_day}</span>
    </div>
    </a>`;
    ongoingSection.querySelector("ul").appendChild(li);
   })

   //completedSection
   j.data.complete_anime.forEach((i) => {
    let li = document.createElement("li");
    li.style.animation = "fadeInUp .4s ease-in-out";
    li.innerHTML = `<a href="/anime/?slug=${i.slug}" class="flex flex-row items-center" alt="${i.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${i.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-28 rounded-l-box bg-[hsla(var(--bc)_/_0.1)] hover:contrast-125 duration-150" height="112" width="79.24">
    <div class="flex-col flex justify-center gap-1 pl-3.5 pr-2 bg-base-100 rounded-r-box w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-28 transition ease-in-out duration-150 border-y border-r border-[hsla(var(--bc)_/_0.2)]">
    <span class="flex flex-row gap-1 items-center "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" /></svg> ${i.episode_count} Episode</span>
    <h3 class="font-medium text-lg line-clamp-1">${i.title}</h3>
    <span class=" flex flex-row gap-0.5 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg> ${i.rating} • ${i.last_release_date}</span>
    </div>
    </a>`;
    completedSection.querySelector("ul").appendChild(li);
   })
  }).catch(error => {
   loadingSpinner1.remove();
   loadingSpinner2.remove();
   let li = document.createElement("li");
   li.className = "text-center my-28";
   li.innerText = "Terjadi kesalahan.";
   ongoingSection.querySelector("ul").appendChild(li);
   completedSection.querySelector("ul").appendChild(li.cloneNode(true));
  });
 },
 search: function(q) {
  let resultSection = document.querySelector("#results-section");
  fetch("https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/search/" + q).then((r)=>r.json()).then((j) => {
   loadingSpinner1.remove();
   if (j.data.length > 0) {
    document.title = `Hasil pencarian dari "${q}" - OtokoDesu`
    j.data.forEach((i) => {
     let li = document.createElement("li");
     li.style.animation = "fadeInUp .4s ease-in-out";
     li.innerHTML = `<a href="/anime/?slug=${i.slug}" class="flex flex-row items-center" alt="${i.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${i.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-28 bg-[hsla(var(--bc)_/_0.1)] rounded-l-box  hover:contrast-125 duration-150" height="112" width="79.24">
    <div class="flex-col flex justify-center gap-1 pl-3.5 pr-2 bg-base-100 rounded-r-box w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-28 transition ease-in-out duration-150 border-y border-r border-[hsla(var(--bc)_/_0.2)]">
    <span class="flex flex-row gap-1 items-center">${i.status.match("Ongoing") ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">   <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" /></svg>': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">   <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /> </svg>'} ${i.status}</span>
     <h3 class="font-medium text-lg line-clamp-1">${i.title}</h3>
     <div class="flex flex-row items-center line-clamp-1 gap-1 break-words"><span class="flex flex-row items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>${i.rating?i.rating: "?"}</span> • <span class="line-clamp-1 break-words">${i.genres.map((g)=>g.name).join(", ")}</span></div></div></a>`;
     resultSection.querySelector("ul").appendChild(li);
    })
   } else {
    let li = document.createElement("li");
    li.className = "text-center my-28";
    li.innerText = "Tidak ada hasil yang ditemukan";
    resultSection.querySelector("ul").appendChild(li);
   }
  }).catch(error => {
   loadingSpinner1.remove();
   let li = document.createElement("li");
   li.className = "text-center my-28";
   li.innerText = "Terjadi kesalahan.";
   resultSection.querySelector("ul").appendChild(li);
  });
 },
 ongoing: function(p) {
  let loadMore = document.querySelector("#loadMore");
  let err = document.querySelector("#err");
  fetch(`https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/ongoing-anime/${p ? p: ""}`).then((r)=>r.json()).then((j) => {
   loadingSpinner1.remove();
   err?err.remove(): null;
   if (j.pagination.has_next_page) {
    loadMore.classList.remove("btn-disabled")
    loadMore.setAttribute("onclick", `this.innerText="Memuat...";getAnime.ongoing(${j.pagination.next_page})`);
   } else {
    loadMore.classList.add("btn-disabled")
   }
   j.data.forEach((i)=> {
    let li = document.createElement("li");
    li.style.animation = "fadeInUp .4s ease-in-out";
    li.innerHTML = `<a href="/anime/?slug=${i.slug}" class="flex flex-row items-center" alt="${i.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${i.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-28 rounded-l-box bg-[hsla(var(--bc)_/_0.1)] hover:contrast-125 duration-150" height="112" width="79.24">
    <div class="flex-col flex justify-center gap-1 pl-3.5 pr-2 bg-base-100 rounded-r-box w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-28 transition ease-in-out duration-150 border-y border-r border-[hsla(var(--bc)_/_0.2)]">
    <span class="flex flex-row gap-1 items-center "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" /></svg> ${i.current_episode}</span>
    <h3 class="font-medium text-lg line-clamp-1">${i.title}</h3>
    <span class="">${i.newest_release_date} • ${i.release_day}</span>
    </div>
    </a>`;
    ongoingSection.querySelector("ul").appendChild(li);
   });
   loadMore.innerText = "Muat Lebih Banyak";
  }).catch(error => {
   loadingSpinner1.remove();
   err?err.remove(): null;
   let span = document.createElement("span");
   span.id = "err";
   span.className = "text-center my-28";
   span.innerText = "Terjadi kesalahan...";
   ongoingSection.querySelector("ul").appendChild(span);
   loadMore.innerText = "Muat Lebih Banyak";
  });
 },
 completed: function(p) {
  let loadMore = document.querySelector("#loadMore");
  let err = document.querySelector("#err");
  fetch(`https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/complete-anime/${p?p: ""}`).then((r)=>r.json()).then((j) => {
   loadingSpinner1.remove();
   err?err.remove(): null;
   if (j.pagination.has_next_page) {
    loadMore.classList.remove("btn-disabled")
    loadMore.setAttribute("onclick", `this.innerText="Memuat...";getAnime.completed(${j.pagination.next_page})`);
   } else {
    loadMore.classList.add("btn-disabled")
   }
   j.data.forEach((i)=> {
    let li = document.createElement("li");
     li.style.animation = "fadeInUp .4s ease-in-out";
    li.innerHTML = `<a href="/anime/?slug=${i.slug}" class="flex flex-row items-center" alt="${i.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${i.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-28 rounded-l-box bg-[hsla(var(--bc)_/_0.1)] hover:contrast-125 duration-150" height="112" width="79.24">
    <div class="flex-col flex justify-center gap-1 pl-3.5 pr-2 bg-base-100 rounded-r-box w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-28 transition ease-in-out duration-150 border-y border-r border-[hsla(var(--bc)_/_0.2)]">
    <span class="flex flex-row gap-1 items-center "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" /></svg> ${i.episode_count} Episode</span>
    <h3 class="font-medium text-lg line-clamp-1">${i.title}</h3>
    <span class=" flex flex-row gap-0.5 items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg> ${i.rating} • ${i.last_release_date}</span>
    </div>
    </a>`;
    completedSection.querySelector("ul").appendChild(li);
   });
   loadMore.innerText = "Muat Lebih Banyak";
  }).catch(error => {
   loadingSpinner1.remove();
   err?err.remove(): null;
   let span = document.createElement("span");
   span.id = "err";
   span.className = "text-center my-28";
   span.innerText = "Terjadi kesalahan...";
   completedSection.querySelector("ul").appendChild(span);
   loadMore.innerText = "Muat Lebih Banyak";
  });
 },
 genres: async function(slug,
  p) {
  try {
   if (slug) {
    let genreName = slug.substring(0, 1).toUpperCase()+slug.substring(1).replace(/-/g, ' ');
    let page = p ? p: 1;
    if (!document.querySelector("#loadMore")) {
     loadingSpinner3 ? loadingSpinner3.parentNode.remove(): null;
     document.title = `Genre: ${genreName} - OtokoDesu`;
     document.querySelector("main").innerHTML += `<section class="flex flex-col">
     <div class="flex flex-row items-center bg-base-100 rounded-t-box p-3 border border-[hsla(var(--bc)_/_0.2)]">
     <h2 class="font-bold text-xl flex-1 items-center line-clamp-1 break-words flex flex-row gap-1">Genre: <em class="font-medium line-clamp-1">${genreName}</em></h2>
     <a class="btn btn-sm btn-square btn-primary flex-none" href="/genres"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-tags-fill w-5 h-5 p-[1px]" viewBox="0 0 16 16"><path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/> <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"/> </svg></a>
     </div>
     <ul class="bg-base-100 p-3 flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3 border-x border-[hsla(var(--bc)_/_0.2)]">
     <span class="border-2 w-7 h-7 rounded-full border-base-200/50 border-b-primary animate-spin mx-auto my-36 md:col-span-2" id="loading-spinner1"></span>
     </ul>
     <div class="flex flex-row items-center bg-base-100 rounded-b-box p-3 border border-[hsla(var(--bc)_/_0.2)]">
     <button id="loadMore" class="btn btn-primary btn-sm btn-disabled w-full md:col-span-2" onclick="this.innerText='Memuat...';getAnime.genres('${slug}', ${page})">Muat Lebih Banyak</button>
     </div>
     </section>`;
    }
    let loadMore = document.querySelector("#loadMore");
    let res = await fetch(`https://otakudesu-anime-api.vercel.app/api/v1/genres/${slug}/${p ? p: 1}`);
    let j = await res.json();
    if (j.genreAnime.length) {
     loadingSpinner1 = document.querySelector("#loading-spinner1");
     loadingSpinner1 ? loadingSpinner1.remove(): null;
     j.genreAnime.forEach((i)=> {
      let li = document.createElement("li");
    li.style.animation = "fadeInUp .4s ease-in-out";
      li.innerHTML = `<a href="/anime/?slug=${i.link}" class="flex flex-row items-center" alt="${i.title}" title="${i.title}">
      <img loading="lazy" src="https://images.weserv.nl/?url=${i.thumb}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-28 rounded-l-box bg-[hsla(var(--bc)_/_0.1)] hover:contrast-125 duration-150" height="112" width="79.24">
      <div class="flex-col flex justify-center gap-1 pl-3.5 pr-2 bg-base-100 rounded-r-box w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-28 transition ease-in-out duration-150 border-y border-r border-[hsla(var(--bc)_/_0.2)]">
      <span class="flex flex-row gap-1 items-center "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" /></svg>${i.episode.match('Unknown') ? "? Episode": i.episode.replace("Eps", "Episode")}</span>
      <h3 class="font-medium text-lg line-clamp-1">${i.title}</h3>
      <div class="flex flex-row gap-1 items-center line-clamp-1 break-words"><span class="flex flex-row items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg> ${(i.rating?i.rating: "?")}</span> • <span class="line-clamp-1 text-ellipsis">${i.studio}</span></div></div></a>`;
      document.querySelector('section ul').appendChild(li);
     });
     loadMore.classList.contains("btn-disabled") ? loadMore.classList.remove("btn-disabled"): null;
     loadMore.innerText = "Muat Lebih Banyak"
     page = page + 1;
     loadMore.onclick = () => {
      loadMore.innerText = 'Memuat...';
      getAnime.genres(slug, page);
     }
    } else {
     alert("Tidak Menemukan Anime Lainnya...");
     loadMore.innerText = "Sudah dimuat semua."
     loadMore.classList.add("btn-disabled");
    }
   } else {
    let res = await fetch("https://otakudesu-anime-api.vercel.app/api/v1/genres");
    let g = await res.json();
    loadingSpinner3?loadingSpinner3.parentNode.remove(): null;
    let genreListSection = document.createElement("section")
    genreListSection.className = "space-y-4";
    genreListSection.innerHTML = `<div>
    <div class="rounded-t-box p-3 bg-base-100 border flex flex-row items-center border-[hsla(var(--bc)_/_0.2)]">
    <h2 class="font-bold text-xl flex-1 flex flex-row items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-tags-fill w-5 h-5" viewBox="0 0 16 16"><path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/> <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"/> </svg>Daftar Genre</h2>
    <input class="input input-sm input-bordered w-32 md:w-auto flex-none" type="search" placeholder="Cari genre..." oninput="let genre_lists = document.querySelector('#genre_lists');
    let genre_list = genre_lists.getElementsByTagName('li');
    for (i = 0; i < genre_list.length; i++) {
    let a = genre_list[i].getElementsByTagName('a')[0];
    if (a.innerText.toUpperCase().indexOf(this.value.toUpperCase()) > -1) {
    genre_list[i].classList.remove('hidden');
    } else {
    genre_list[i].classList.add('hidden');
    }
    };
    if(/&zwnj;/.test(genre_lists.innerText)){
    genre_lists.querySelector('center').remove();
    } else {
    genre_lists.querySelector('center') ? genre_lists.querySelector('center').remove():null;
    let notFound = document.createElement('center');
    notFound.className='col-span-2 my-20';
    notFound.innerText='Tidak ditemukan';
    genre_lists.appendChild(notFound);
    }"></div>
    <div class="rounded-b-box p-4 bg-base-100 border-x border-b border-[hsla(var(--bc)_/_0.2)]">
    <ul id="genre_lists" class="grid grid-cols-2 gap-1.5 md:grid-cols-4">
    ${g.genres.map((g) => '<li style="animation: fadeInUp .4s ease-in-out;"><a class="btn btn-sm btn-primary w-full normal-case relative" href="/genres/?slug='+g.endpoint+'">&zwnj;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 absolute left-1.5 p-[1px]"><path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" /> </svg> '+g.genre+'</a></li>').join("")}
    </ul></div></div>`;
    document.querySelector("main").appendChild(genreListSection);
   }
  } catch(e) {
   nothingHere();
  }
 },
 batch: async function(slug) {
  try {
   let res = await fetch("https://otakudesu-anime-api.vercel.app/api/v1/batch/" + slug);
   let j = await res.json();
   if (j.batch.title) {
    loadingSpinner1.parentNode.remove();
    document.title = `${j.batch.title} - OtokoDesu`;
    document.getElementsByTagName("meta")["description"].content = `Unduh Anime ${j.batch.title} resolusi 360p, 480p, 720p format Mp4. (Situs ini dibuat dengan OtakuDesu API/Scraper)`;
    document.querySelector("main").innerHTML = `<section class="flex flex-col">
     <div class="flex flex-row items-center bg-base-100 rounded-t-box p-3 border border-[hsla(var(--bc)_/_0.2)]">
      <h2 class="text-xl font-bold flex flex-row items-center gap-2 line-clamp-2">${j.batch.title}</h2>
     </div>
     <ul class="bg-base-200 menu p-3 gap-4 md:grid md:grid-cols-3 border-x border-b rounded-b-box border-[hsla(var(--bc)_/_0.2)]">
      <div class="flex flex-col" style="animation: fadeInUp .3s ease-in-out;">
      <h3 class="font-medium border p-3 rounded-t-box bg-base-100 border-[hsla(var(--bc)_/_0.2)]">${j.batch.download_list.low_quality.quality} (${j.batch.download_list.low_quality.size})</h3>
      <div class="border-x border-b rounded-b-box p-3 space-y-1.5 bg-base-100 border-[hsla(var(--bc)_/_0.2)]">
      ${j.batch.download_list.low_quality.download_links.map((i) => '<li><a href="'+i.link+'" class="border border-[hsla(var(--bc)_/_0.2)]" style="animation: fadeInUp .4s ease-in-out;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 p-[1px]"><path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" /></svg> '+i.host+'</a></li>').join("")}
      </div>
      </div>
      <div class="flex flex-col" style="animation: fadeInUp .3s ease-in-out;">
      <h3 class="font-medium border p-3 rounded-t-box bg-base-100 border-[hsla(var(--bc)_/_0.2)]">${j.batch.download_list.medium_quality.quality} (${j.batch.download_list.medium_quality.size})</h3>
      <div class="border-x border-b rounded-b-box p-3 space-y-1.5 bg-base-100 border-[hsla(var(--bc)_/_0.2)]">
      ${j.batch.download_list.medium_quality.download_links.map((i) => '<li><a href="'+i.link+'" class="border border-[hsla(var(--bc)_/_0.2)]" style="animation: fadeInUp .4s ease-in-out;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 p-[1px]"><path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" /></svg> '+i.host+'</a></li>').join("")}
      </div>
      </div>
      <div class="flex flex-col" style="animation: fadeInUp .3s ease-in-out;">
      <h3 class="font-medium border p-3 rounded-t-box bg-base-100 border-[hsla(var(--bc)_/_0.2)]">${j.batch.download_list.high_quality.quality} (${j.batch.download_list.high_quality.size})</h3>
      <div class="border-x border-b rounded-b-box p-3 space-y-1.5 bg-base-100 border-[hsla(var(--bc)_/_0.2)]">
      ${j.batch.download_list.high_quality.download_links.map((i) => '<li><a href="'+i.link+'" class="border border-[hsla(var(--bc)_/_0.2)]" style="animation: fadeInUp .4s ease-in-out;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 p-[1px]"><path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" /></svg> '+i.host+'</a></li>').join("")}
      </div>
      </div>
     </ul>
    </section>`;
   } else {
    nothingHere()
   }
  } catch(e) {
   nothingHere();
  }
 },
 episode: async function(eps_slug, anime_slug) {
  let res = await fetch("https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/episode/" + eps_slug);
  let eps = await res.json();
  // console.log(eps);
  if (eps.status != "Ok") {
   nothingHere()
  } else {
   document.title = `${eps.data.episode} - OtokoDesu`;
   document.getElementsByTagName("meta")["description"].content = `Unduh, Nonton, & Streaming Anime ${eps.data.episode} resolusi 360p, 480p, 720p, HD, HR format Mp4 dan Mkv lengkap beserta Batch. (Situs ini dibuat dengan OtakuDesu API/Scraper)`;
   document.querySelector("meta[property='og:title']").content = `${eps.data.episode} - OtokoDesu`;
   document.querySelector("meta[property='og:description']").content = `Unduh, Nonton, & Streaming Anime ${eps.data.episode} resolusi 360p, 480p, 720p, HD, HR format Mp4 dan Mkv lengkap beserta Batch. (Situs ini dibuat dengan OtakuDesu API/Scraper)`;

   document.querySelector("iframe").src = eps.data.stream_url;
   let prev = document.querySelector("#prev");
   let next = document.querySelector("#next");
   if (eps.data.has_previous_episode) {
    prev.href = `/episode/?eps_slug=${eps.data.previous_episode.slug}&anime_slug=${anime_slug}`;
    prev.classList.remove("btn-disabled");
   }
   if (eps.data.has_next_episode) {
    next.href = `/episode/?eps_slug=${eps.data.next_episode.slug}&anime_slug=${anime_slug}`;
    next.classList.remove("btn-disabled");
   }
   document.querySelector("#episode").innerText = eps.data.episode;
   document.querySelector("#download-menu").innerHTML = `${eps.data.download_urls.mp4.map((d) => '<li class="menu-title"><span>'+d.resolution+'</span></li><li>'+ (d.urls.map((u) => "<a target='_blank' href='"+u.url+"'>"+u.provider+"</a>").join("")) +'</li>').join("")}`

   let Res = await fetch("https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/anime/" + anime_slug);
   let anime = await Res.json();
   if (anime.status == "Ok") {
    document.querySelector("meta[property='og:image']").content = anime.data.poster;
    loadingSpinner1.parentNode.remove();
    document.querySelector("#episode_lists").innerHTML = `${anime.data.episode_lists.map((eps, i) => (!/Pembatas\sEpisode/g.test(eps.episode)) ? '<option '+(eps_slug == eps.slug ? "selected disabled": "")+' value="/episode/?eps_slug='+eps.slug+'&anime_slug='+anime_slug+'">'+eps.episode.match(epsRegex)+'</option>': '').join('')}`;
    document.querySelector("main > section").innerHTML += `<a href="/anime/?slug=${anime_slug}" class="w-full bg-base-100 rounded-box relative overflow-hidden p-3 flex flex-row gap-3 hover:bg-primary hover:text-primary-content duration-100 items-center" style="animation:fadeInUp .4s ease-in-out; height:8.95rem" title="${anime.data.title}" alt="${anime.data.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${anime.data.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" class="rounded-lg h-full" alt="${anime.data.title}" title="${anime.data.title}">
    <div class="flex flex-col gap-0.5">
    <span class="text-sm flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor" class="w-5 h-5 scale-"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>${anime.data.rating ? anime.data.rating: '?'} • ${anime.data.status} • ${anime.data.type}</span>
    <h4 class="font-bold line-clamp-1 break-words">${anime.data.title}</h4>
    <h5 class="text-sm font-medium line-clamp-1 break-words">${anime.data.japanese_title}</h5>
    <small class="text-sm line-clamp-1">${anime.data.studio}</small>
    <small class="text-sm line-clamp-1 break-words italic">${anime.data.genres.map((g) => g.slug.substring(0, 1).toUpperCase()+g.slug.substring(1).replace(/-/g, " ")).join(', ')}</small>
    </div>
    </a>
    ${anime.data.batch ? '<section class="flex flex-col gap-1"><h4 class="text-xl font-bold">Batch</h4><div class="flex flex-row items-center relative h-20" style="animation:fadeInUp .4s ease-in-out"><div class="bg-base-100 rounded-l-box p-4 flex-1 flex flex-col justify-center gap-1 h-full"><a href="/batch/?slug='+anime.data.batch.slug+'" class="line-clamp-1 font-medium link link-hover">'+anime.data.title+' Batch Subtitle Indonesia</a><small>'+anime.data.batch.uploaded_at.replace(",", ", ")+'</small></div><a href="/batch/?slug='+anime.data.batch.slug+'" alt="'+anime.data.title+' Batch Subtitle Indonesia" title="'+anime.data.title+' Batch Subtitle Indonesia" class="rounded-r-box bg-base-100 h-full hover:bg-primary hover:text-primary-content p-5 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">   <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" /> </svg> </a></div></section>': ''}
    <div class="divider"></div>`;
    document.querySelector("main").innerHTML += `<aside><section class="flex flex-col gap-3 px-4" style="animation: fadeInUp .4s ease-in-out">
    <h3 class="text-xl font-bold">Rekomendasi Anime Lainnya</h3>
    ${anime.data.recommendations.map((i) => '<a href="/anime/?slug='+i.slug+'" title="'+i.title+'" class="rounded-box overflow-hidden bg-base-100 flex flex-row items-center h-32 hover:bg-primary hover:text-primary-content transition duration-150 ease-in-out"><img loading="lazy" src="https://images.weserv.nl/?url='+i.poster+'&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" class="h-32" alt="'+i.title+'" title="'+i.title+'"><figcaption class="text-lg font-medium p-4 line-clamp-3">'+i.title+'</figcaption></figure></a>').join("")}
    </section></aside>`;
   } else {
    //
   }
  }
 },
 info: function(slug) {
  fetch("https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/anime/" + slug).then((r) => r.json()).then((j) => {
   // console.log(j);
   if (j.status == "Ok") {
    document.title = `${j.data.title} - OtokoDesu`;
    document.getElementsByTagName("meta")["description"].content = `Unduh, Nonton, & Streaming Anime ${j.data.title} Sub Indo resolusi 360p, 480p, 720p, HD, HR format Mp4 dan Mkv lengkap beserta Batch.`;
    document.querySelector("meta[property='og:title']").content = `${j.data.title} - OtokoDesu`;
    document.querySelector("meta[property='og:description']").content = `Unduh, Nonton, & Streaming Anime ${j.data.title} resolusi 360p, 480p, 720p, HD, HR format Mp4 dan Mkv lengkap beserta Batch. (Situs ini dibuat dengan OtakuDesu API/Scraper)`;
    document.querySelector("meta[property='og:image']").content = j.data.poster;
    loadingSpinner1.parentNode.remove();
    let animeSection = document.createElement("section");
    animeSection.classList.add("col-span-3");
    animeSection.innerHTML = `<article class="space-y-5" style="animation: fadeInUp .4s ease-in-out">
    <header class="space-y-1">
    <h2 class="text-2xl font-bold ">${j.data.title}</h2>
    <h3 class="font-medium text-primary">${j.data.japanese_title}</h3>
    </header>
    <figure class="relative w-full rounded-box flex justify-center items-center overflow-hidden border-4 border-base-100 shadow-2xl shadow-inner" style="aspect-ratio: 16 / 12;">
    <div class="bg-repeat-x blur-2xl w-full bg-base-100 absolute" style="aspect-ratio: 16 / 12; background-image:url('https://images.weserv.nl/?url=${j.data.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg'); z-index:0; animation: blurBgCover 150s infinite;"></div>
    <small style="z-index:1" class=" p-1.5 text-sm font-medium rounded-md bg-black/20 shadow-2xl text-white top-2 right-2 absolute ">${j.data.status.search('Completed') ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" /></svg>': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>'}</small>
    <small style="z-index:1" class=" p-1.5 text-sm font-medium rounded-md bg-black/20 shadow-2xl text-white top-11 left-2 absolute " >${j.data.type}</small>
    <small style="z-index:1" class=" p-1.5 rounded-md bg-black/20 shadow-2xl text-white left-2 top-2 absolute font-medium flex flex-row items-center gap-0.5 " ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>${j.data.rating ? j.data.rating: '?'}</small>
    <img loading="lazy" src="https://images.weserv.nl/?url=${j.data.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" style="z-index:1" class="h-5/6 shadow-2xl border-4 border-black/10 rounded-xl scale-105" alt="${j.data.title}" title="${j.data.title}">
    </figure>
    ${bookmarks.get(slug) ? '<button class="btn btn-error w-full gap-2" onclick="if(confirm(`Hapus Anime Ini Dari Bookmark?`)){bookmarks.remove(`'+slug+'`);alert(`Anime Berhasil Dihapus Dari Bookmark.`);location.reload();}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" /></svg> Hapus Dari Bookmark</button>': '<button class="btn btn-primary w-full gap-2" onclick="bookmarks.add(`'+slug+'`, `'+j.data.title+'`, `'+j.data.poster+'`, `'+(j.data.genres.map((g)=>g.name==" " ? "Ecchi": g.name).join(", "))+'`);alert(`Anime Berhasil Disimpan Ke Bookmark.`);location.reload();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" /> </svg> Simpan Ke Bookmark</button>'}
    <section class="overflow-x-auto w-full border-8 border-base-100 bg-base-100 rounded-box">
    <table class="table table-compact w-full ">
    <tbody>
    <tr class="hover">
    <th>Studio</th>
    <th>:</th>
    <td>${j.data.studio}</td>
    </tr>
    <tr class="hover">
    <th>Produser</th>
    <th>:</th>
    <td>${j.data.produser}</td>
    </tr>
    <tr class="hover">
    <th>Total Episode</th>
    <th>:</th>
    <td>${j.data.episode_count}</td>
    </tr>
    <tr class="hover">
    <th>Durasi</th>
    <th>:</th>
    <td>${j.data.duration}</td>
    </tr>
    <tr class="hover">
    <th>Tanggal Rilis</th>
    <th>:</th>
    <td>${j.data.release_date}</td>
    </tr>
    </tbody>
    </table>
    </section>
    <section class="flex flex-col gap-1.5">
    <h4 class="text-xl font-bold flex">Genre</h4>
    <ul class="flex flex-row gap-1 overflow-x-auto">
    ${j.data.genres.map((g) => '<li><a href="/genres/?slug='+g.slug+'" class="btn btn-primary btn-sm whitespace-nowrap">'+(g.name==" " ? "Ecchi": g.name)+'</a></li>').join('')}
    </ul>
    </section>
    <section tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box">
    <input type="checkbox" />
    <h4 class="collapse-title text-xl font-bold">
    Ringkasan
    </h4>
    <div class="collapse-content">
    ${j.data.synopsis ? '<p class="break-words" style="white-space: -moz-pre-wrap; white-space: pre-wrap;">'+j.data.synopsis+'</p>': '<p class="text-center my-5">Ringkasan tidak tersedia.</p>'}
    </div>
    </section>
    ${j.data.batch ? '<section class="flex flex-col gap-1"><h4 class="text-xl font-bold">Batch</h4><div class="flex flex-row items-center relative h-20"><div class="bg-base-100 rounded-l-box p-4 flex-1 flex flex-col justify-center gap-1 h-full"><a href="/batch/?slug='+j.data.batch.slug+'" class="line-clamp-1 font-medium link link-hover">'+j.data.title+' Batch Subtitle Indonesia</a><small>'+j.data.batch.uploaded_at.replace(",", ", ")+'</small></div><a href="/batch/?slug='+j.data.batch.slug+'" alt="'+j.data.title+' Batch Subtitle Indonesia" title="'+j.data.title+' Batch Subtitle Indonesia" class="rounded-r-box bg-base-100 h-full hover:bg-primary hover:text-primary-content p-5 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">   <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" /> </svg> </a></div></section>': ''}
    <section class="flex flex-col gap-2">
    <div class="flex flex-row items-center">
    <h4 class="text-xl font-bold flex-1 ">Daftar Episode</h4>
    <input type="search" placeholder="Cari episode..." oninput="let episode_lists = document.querySelector('#episode_lists');
    let episode_list = episode_lists.getElementsByTagName('li');
    for (i = 0; i < episode_list.length; i++) {
    let a = episode_list[i].getElementsByTagName('a')[0];
    if(a.innerText.toUpperCase().indexOf(this.value.toUpperCase()) > -1) {
    episode_list[i].classList.remove('hidden');
    } else {
    episode_list[i].classList.add('hidden');
    }
    }; if(/(Episode|Special|OVA)/gi.test(episode_lists.innerText)){
    episode_lists.querySelector('center').remove();
    } else {
    episode_lists.querySelector('center') ? episode_lists.querySelector('center').remove() : null;
    episode_lists.innerHTML+='<center><br/>Tidak ditemukan.<br/><br/></center>';
    }" id="search-episode" class="input input-bordered input-sm flex-none w-32">
    </div>
    <div class="p-2 bg-base-100 rounded-box">
    <div class="overflow-auto rounded-box " style="max-height:70vh">
    <ul class="menu rounded-box " id="episode_lists">
    `+ (j.data.episode_lists.map((eps, i) => (!/Pembatas\sEpisode/g.test(eps.episode)) ? '<li><a href="/episode/?eps_slug='+eps.slug+'&anime_slug='+slug+'" title="'+eps.episode+'" class="font-medium border border-base-200"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" /></svg>'+eps.episode.match(epsRegex)+'</a></li>': '').join(''))+`
    </ul></div></div>
    </section>
    </article>
    <div class="divider md:hidden"></div>`;
    let aside = document.querySelector("aside");
    document.querySelector("main").insertBefore(animeSection, aside);
    document.querySelector(".collapse input").checked = true;
    aside.innerHTML += `<section class="flex flex-col gap-3" style="animation: fadeInUp .4s ease-in-out">
    <h4 class="text-xl font-bold ">Rekomendasi Anime Lainnya</h4>
    ${j.data.recommendations.map((i) => '<a href="/anime/?slug='+i.slug+'" title="'+i.title+'" class="rounded-box overflow-hidden bg-base-100 flex flex-row items-center h-32 hover:bg-primary hover:text-primary-content transition duration-150 ease-in-out"><img loading="lazy" src="https://images.weserv.nl/?url='+i.poster+'&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" class="h-32" alt="'+i.title+'" title="'+i.title+'"><figcaption class="text-lg font-medium p-4 line-clamp-3">'+i.title+'</figcaption></figure></a>').join("")}
    </section>`;
   } else {
    throw new Error()
   }
  }).catch(error => {
   loadingSpinner1.remove();
   nothingHere.classList.remove("hidden");
  })
 },
 bookmarks: function(slug) {
  let bookmarksSection = document.querySelector("#bookmarks-section");
  let i = bookmarks.get(slug);
  if (i.length > 0) {
   loadingSpinner1.remove();
   bookmarksSection.querySelector("input").disabled = false;
   i.reverse().forEach((i) => {
    let li = document.createElement("li");
    li.className = "flex flex-row items-center w-full";
    li.style.animation = "fadeInUp .4s ease-in-out";
    li.innerHTML = `<a href="/anime/?slug=${i.slug}" class="flex flex-row items-center" alt="${i.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${i.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-24 bg-[hsla(var(--bc)_/_0.1)] rounded-l-box hover:contrast-125 duration-150" height="96" width="67.92">
    <div class="flex-col flex justify-center gap-1.5 pl-3 pr-2 bg-base-100 w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-24 transition ease-in-out duration-150 border-y border-[hsla(var(--bc)_/_0.2)]">
    <h3 class="font-medium text-lg line-clamp-1">&zwnj;${i.title}</h3>
    <span class="line-clamp-1 text-ellipsis">${i.genres}</span>
    </div>
    </a>
    <button class="rounded-r-box p-1.5 bg-base-100 text-error hover:bg-error hover:text-error-content h-24 flex border border-error/50 justify-center items-center" onclick="if(confirm('Hapus Anime Ini Dari Bookmark?')){bookmarks.remove('${i.slug}');alert('Anime Berhasil Dihapus Dari Bookmark.');this.parentNode.remove(); if(!document.querySelector('#bookmarks_lists li')){location.reload()}}">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" /></svg>
    </button>`;
    bookmarksSection.querySelector("ul").appendChild(li);
   });
  } else {
   loadingSpinner1.remove()
   bookmarksSection.querySelector("ul").innerHTML = "<span class='text-center my-48'>Bookmark kosong.</span>";
  }
 }
};

let searchInput = document.querySelector("#search-input");
async function searchSuggestion() {
 let Box = document.querySelector("#searchSuggestion")
 Box?Box.remove(): null;
 if (this.value < 1) {
  Box.remove();
 } else {
  let box = document.createElement("div");
  box.id = "searchSuggestion";
  box.className = " w-72 md:w-96"
  box.style.borderColor = "hsla(var(--bc) / 0.2)";
  box.innerHTML = "<ul class='flex flex-col gap-1.5 max-h-80 overflow-y-auto'><center>Tunggu sebentar..</center></ul>";
  document.querySelector("header .flex-none .dropdown .dropdown-content").appendChild(box);
  let res = await fetch("https://otakudesu-unofficial-api.rzkfyn.tech/api/v1/search/"+this.value)
  let j = await res.json();
  box.querySelector("center").remove();
  if (j.data.length > 0) {
   j.data.forEach((i)=> {
    let resItem = document.createElement("li");
    resItem.innerHTML = `<a href="/anime/?slug=${i.slug}" class="flex flex-row items-center" alt="${i.title}">
    <img loading="lazy" src="https://images.weserv.nl/?url=${i.poster}&q=10&w=225&h=318&fit=contain&cbg=black&output=webp&default=https://i.ibb.co/CsgfGYT/noImage.jpg" alt="${i.title}" title="${i.title}" class="h-20 bg-[hsla(var(--bc)_/_0.1)] rounded-l-box  hover:contrast-125 duration-150" height="76" width="53.76">
    <div class="flex-col flex justify-center px-2.5 bg-base-100 rounded-r-box w-full active:bg-primary active:text-primary-content hover:bg-[hsl(var(--bc)_/_0.1)] h-20 transition ease-in-out duration-150 border-y border-r border-[hsla(var(--bc)_/_0.2)]">
    <span class="flex flex-row items-center text-sm">${i.status.match("Ongoing") ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="w-5 h-5 p-[1px]"><path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" /></svg>': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" class="w-5 h-5 p-[1px]"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>'} ${i.status}</small></span>
    <b class="line-clamp-1 font-medium">${i.title}</b>
    <span class="text-sm flex flex-row items-center gap-1 line-clamp-1 break-words"><small class="flex flex-row items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27" fill="currentColor" class="w-5 h-5 p-[1px]"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /> </svg>  ${i.rating?i.rating: "?"}</small> • <small class="line-clamp-1 text-sm">${i.genres.map((g)=>g.name).join(", ")}</small></span>
    </div>
    </a>`;
    box.querySelector("ul").appendChild(resItem)
   })
  } else {
   box.innerHTML = "<center>Tidak ada hasil yang ditemukan</center>";
  }
 }
}
searchInput.addEventListener('input', searchSuggestion);


var bookmarks = {
 add: function(slug, title, poster, genres) {
  let i;
  if (!localStorage.bookmarks) {
   i = JSON.stringify([]);
   localStorage.bookmarks = i;
  }
  i = JSON.parse(localStorage.bookmarks);
  i.push({
   title: title, slug: slug, poster: poster, genres: genres
  });
  localStorage.bookmarks = JSON.stringify(i);
 },
 get: function(slug) {
  if (!slug) {
   return JSON.parse(localStorage.bookmarks ? localStorage.bookmarks : "[]");
  } else {
   return JSON.parse(localStorage.bookmarks ? localStorage.bookmarks: "[]").find(i=>i.slug==slug);
  }
 },
 remove: function(slug) {
  let items = JSON.parse(localStorage.bookmarks).filter(i=>i.slug != slug);
  localStorage.bookmarks = JSON.stringify(items ? items: "[]");
 }
}

let toTopBtn = document.getElementById("toTopBtn");
window.onscroll = () => {
 if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
  toTopBtn.classList.remove("hidden");
 } else {
  toTopBtn.classList.add("hidden");
 }
};





//javascript: (function () {var script = document.createElement('script'); script.src = "//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() }})();