const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";

const params = new URLSearchParams(window.location.search);
const id = params.get("albumId");
const url2 = `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`;

// const arrayPlaylist = [578, 479, 352, 158, 160, 165, 166, 170, 180, 127, 12, 5, 13, 636, 864, 1679, 56434, 64321, 89463, 7455, 46453];

const rowCardLeft = document.getElementById("rowCardLeft");
const copertina = document.getElementById("copertina");
const listSong = document.getElementById("listSong");
const urlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/155";

const buttonToggleSidebar = document.getElementById("buttonToggleSidebar");
const leftSidebarCollapsed = document.getElementById("leftSidebarCollapsed");
const buttonReverseCollapse = document.getElementById("buttonReverseCollapse");
const leftSidebar = document.getElementById("leftSidebar");

buttonToggleSidebar.addEventListener("click", function () {
  leftSidebarCollapsed.classList.add("d-none");
});

buttonReverseCollapse.addEventListener("click", function () {
  leftSidebarCollapsed.classList.remove("d-none");
  leftSidebar.classList.remove("show");
});

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": token,
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// riempie colonna sinistra
const fillSxColumn = function (ogg2) {
  const listSideBarCollapsed = document.getElementById("listSideBarCollapsed");
  for (let i = 0; i < 15; i++) {
    const track = ogg2.tracks.data[i];

    const cardLeft = document.createElement("div");
    cardLeft.className = "col-12";

    cardLeft.innerHTML = `
    <div class="card mb-3 text-white" style="background-color:#121212">
    <div class="row">
    <div class="col-4">
        <a href="../album.html?albumId=${track.album.id}">

    <img src="${track.album.cover_small}" alt="songs.album.cover" class=" img-fluid rounded w-100">
    </a>
    </div>
    <div class="col-8 p-0 align-items-baseline">
    <div class="card-body text-truncate w-100 text-white">
    <a class="text-decoratione-none link-underline link-underline-opacity-0 " href="../album.html?albumId=${track.album.id}"><h6 class="text-white mb-1 text-truncate fs-5">${track.album.title}</h6></a>
    <a class="text-decoratione-none link-underline link-underline-opacity-0 " href="../artist.html?artistId=${track.artist.id}"><p style="color: #6c757d" class="mb-0 text-truncate">${track.artist.name}</p></a>
    </div>
    </div>
    </div>
    </div>
    `;

    rowCardLeft.appendChild(cardLeft);

    // genera album per colonna collasata
    const iconAlbum = document.createElement("li");
    iconAlbum.classList.add("mb-1");
    iconAlbum.innerHTML = `
            <a href="../album.html?albumId=${track.album.id}">

    <img src="${track.album.cover_small}" alt="songs.album.cover" class="rounded" />
    </a>
    `;
    listSideBarCollapsed.appendChild(iconAlbum);
  }
};

// funzione per player
const songPlayer = function (s, i) {
  console.log(s);
  console.log(i);
  clnRight.classList.remove("d-none");
  const duration = `${s.tracks.data[i].duration}`;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const player = document.getElementById("player");
  const divPlayer = document.createElement("div");
  player.innerHTML = ``;
  divPlayer.className = "row align-items-center";
  divPlayer.innerHTML = `<div class="col-3 text-white">
                <div class="row align-items-center">
                    <div class="col-4">
                        <img src="${s.cover}" class="img-fluid p-4" alt="imgage brano">
                    </div>
                    <div class="col-8">
                        <div class="row align-items-center">
                            <div class="col-10 py-3">
                                <h3 class="m-0 text-truncate">${s.tracks.data[i].title}</h3>
                                <p>${s.artist.name}</p>

                            </div>
                            <div class="col-2 d-flex align-items-center">
                                <svg data-encore-id="icon" role="img" aria-hidden="true"
                                    class="e-9890-icon e-9890-baseline" viewBox="0 0 16 16" style="fill:white"
                                    height="15">
                                    <path
                                        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z">
                                    </path>
                                    <path
                                        d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z">
                                    </path>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-6 text-white px-5">
                <div class="col d-flex justify-content-center my-2">
                    <button class="btn">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                            viewBox="0 0 16 16" style="fill:white" height="15">
                            <path
                                d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z">
                            </path>
                            <path
                                d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z">
                            </path>
                        </svg>
                    </button>
                    <button class="btn">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                            viewBox="0 0 16 16" style="fill:white" height="15">
                            <path
                                d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z">
                            </path>
                        </svg>
                    </button>
                    
                    <button class="btn bg-light rounded-circle" id="play">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                            viewBox="0 0 16 16" style="fill:black" height="15">
                            <path
                                d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z">
                            </path>
                        </svg>
                    </button>
                    <button class="btn">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                            viewBox="0 0 16 16" style="fill: white;" height="15">
                            <path
                                d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z">
                            </path>
                        </svg>
                    </button>
                    <button class="btn">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                            viewBox="0 0 16 16" style="fill:white" height="15">
                            <path
                                d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="col d-flex justify-content-center align-items-center">
                    <p class="m-0" id="start" style="visibility: hidden;">00:00</p>
                    <div class="progress mx-3" style="height: 5px; width: 100%;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="25" id="progress"
                            aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="m-0">${minutes}:${seconds}</p>
                </div>
            </div>
            <div class="col-3 text-white d-flex justify-content-center align-items-center">
                <button class="btn">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                        viewBox="0 0 16 16" height="15
            " style="fill:white; --encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);">
                        <path
                            d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z">
                        </path>
                    </svg>
                </button>
                <button class="btn">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                        viewBox="0 0 16 16" height="15
            " style="fill:white;--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);">
                        <path
                            d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z">
                        </path>
                    </svg>
                </button>
                <button class="btn">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                        viewBox="0 0 16 16" height="15
            " style="fill:white;--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);">
                        <path
                            d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z">
                        </path>
                    </svg>
                </button>
                <button class="btn">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                        viewBox="0 0 16 16" height="15
            " style="fill:white;--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);">
                        <path
                            d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z">
                        </path>
                        <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                    </svg>
                </button>
                <button class="btn">
                    <svg data-encore-id="icon" role="presentation" aria-label="Volume alto" aria-hidden="false"
                        class="e-9890-icon e-9890-baseline" id="volume-icon" viewBox="0 0 16 16" height="15
            " style="fill:white;--encore-icon-height: var(--encore-graphic-size-informative-smaller); --encore-icon-width: var(--encore-graphic-size-informative-smaller);">
                        <path
                            d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z">
                        </path>
                        <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
                    </svg>
                </button>
                <div class="progress" style="height: 5px; width: 100%;">
                    <div class="progress-bar bg-success" role="progressbar" style="width:0%" aria-valuenow="0" 
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button class="btn">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline"
                        viewBox="0 0 16 16" height="15"
                        style="fill:white;--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);">
                        <path
                            d="M16 2.45c0-.8-.65-1.45-1.45-1.45H1.45C.65 1 0 1.65 0 2.45v11.1C0 14.35.65 15 1.45 15h5.557v-1.5H1.5v-11h13V7H16V2.45z">
                        </path>
                        <path
                            d="M15.25 9.007a.75.75 0 0 1 .75.75v4.493a.75.75 0 0 1-.75.75H9.325a.75.75 0 0 1-.75-.75V9.757a.75.75 0 0 1 .75-.75h5.925z">
                        </path>
                    </svg>
                </button>
                <button class="btn">
                    <svg width="16" height="15" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M0.25 3C0.25 2.0335 1.0335 1.25 2 1.25H5.375V2.75H2C1.86193 2.75 1.75 2.86193 1.75 3V5.42857H0.25V3ZM14 2.75H10.625V1.25H14C14.9665 1.25 15.75 2.0335 15.75 3V5.42857H14.25V3C14.25 2.86193 14.1381 2.75 14 2.75ZM1.75 10.5714V13C1.75 13.1381 1.86193 13.25 2 13.25H5.375V14.75H2C1.0335 14.75 0.25 13.9665 0.25 13V10.5714H1.75ZM14.25 13V10.5714H15.75V13C15.75 13.9665 14.9665 14.75 14 14.75H10.625V13.25H14C14.1381 13.25 14.25 13.1381 14.25 13Z">
                        </path>
                    </svg>
                </button>
            </div>`;
  player.appendChild(divPlayer);

  const right = document.getElementById("clnRight");
  const ctnRight = document.createElement("div");
  right.innerHTML = ``;
  ctnRight.style.backgroundImage = `url(${s.cover_xl})`;
  ctnRight.style.backgroundSize = "cover";
  ctnRight.style.backgroundRepeat = "no-repeat";
  ctnRight.style.backgroundPosition = "center";
  ctnRight.style.height = "100%";

  ctnRight.innerHTML = `<div class="d-flex flex-column justify-between h-100">
    
    <p class="text-white">${s.title}</p>
    <div class="mt-auto">
    <h5 class="text-white">${s.tracks.data[i].title}</h5>
    <p class="text-white">${s.artist.name}</p>
    </div>
  </div>`;
  right.appendChild(ctnRight);

  let isPlaying = false;
  let audioPlayer = null;
  const play = document.getElementById("play");
  const start = document.getElementById("start");
  const progress = document.getElementById("progress");
  const playUrl = `${s.tracks.data[i].preview}`;

  /* buttonPlay */

  play.addEventListener("click", function () {
    start.style.visibility = "visible";
    if (!audioPlayer) {
      audioPlayer = new Audio(playUrl);
      player.appendChild(audioPlayer);
    }

    if (isPlaying === true) {
      audioPlayer.pause();
      isPlaying = false;

      play.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline" viewBox="0 0 16 16" style="fill:black; height:20"><path d="M4 1.5v13l10-6.5-10-6.5z"></path></svg>`;
    } else {
      audioPlayer.play();
      isPlaying = true;

      const current = setInterval(() => {
        start.innerHTML = `00:${String(Math.floor((audioPlayer.currentTime + 1) % 60)).padStart(2, "0")}`;
        const percent = (Math.floor(audioPlayer.currentTime) / 30) * 100;
        progress.style.width = `${Math.min(percent, 100)}%`;
        progress.setAttribute("aria-valuenow", Math.floor(percent));
      }, 1000);

      play.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline" viewBox="0 0 16 16" style="fill:black; height:20"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
    }
  });
};

// random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// riempie colonna centrale
const albumFun = function () {
  fetch(url2, options)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Prodotti non trovati.");
        } else if (response.status >= 500) {
          throw new Error("Errore del server, riprova più tardi.");
        }
        throw new Error("Errore nella richiesta dei prodotti.");
      }
      return response.json();
    })
    .then((album) => {
      const divTitolo = document.createElement("div");

      divTitolo.className = "row align-items-center rounded py-4";
      divTitolo.style.backgroundColor = getRandomColor();

      const duration = album.duration;
      const ore = Math.floor(duration / 3600); // 1 ora
      const minutes = Math.floor((duration % 3600) / 60);

      divTitolo.innerHTML = `
      <div class="col-4">
        <img class="img-fluid rounded " src="${album.cover_big}" alt="album.cover" />
      </div>
      <div class="col-8 text-white">
        <p class="m-0 text-capitalize">${album.type}</p>
        <h1 class="fw-bold display-5">${album.title}</h1>
        <div class="d-flex">
          <img class="imgArtist h-25 rounded-circle mx-1" src=" ${album.artist.picture_small} " alt="album.artist.picture" />
          <a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?artistId=${album.artist.id}"><p class="d-inline-block text-white">${album.artist.name}</p></a>
          <p class="opacity-75">•  ${album.release_date} •</p>
          <p class="mx-1 opacity-75">${album.nb_tracks} brani, </p>
          <p class="opacity-75">${ore} ora ${minutes} minuti</p>
        </div>
      </div>`;

      // const divPlayer = document.createElement("div");
      // divPlayer.className = "row";

      // divPlayer.innerHTML = `
      // <div class="col d-flex my-3">
      //   <button class="btn border-0 rounded-circle py-2" style="background-color:#1ED760">
      //     <svg
      //       data-encore-id="icon"
      //       role="img"
      //       aria-hidden="true"
      //       class="e-9890-icon e-9890-baseline"
      //       viewBox="0 0 16 16"
      //       style="fill: black"
      //       height="16"
      //     >
      //       <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
      //     </svg>
      //   </button>
      //   <button class="btn border-0">
      //     <svg
      //       version="1.1"
      //       id="Layer_1"
      //       xmlns="http://www.w3.org/2000/svg"
      //       xmlns:xlink="http://www.w3.org/1999/xlink"
      //       x="0px"
      //       y="0px"
      //       viewBox="0 0 122.88 109.57"
      //       style="fill: white"
      //       height="20"
      //       xml:space="preserve"
      //     >
      //       <g>
      //         <path
      //           d="M65.46,19.57c-0.68,0.72-1.36,1.45-2.2,2.32l-2.31,2.41l-2.4-2.33c-0.71-0.69-1.43-1.4-2.13-2.09 c-7.42-7.3-13.01-12.8-24.52-12.95c-0.45-0.01-0.93,0-1.43,0.02c-6.44,0.23-12.38,2.6-16.72,6.65c-4.28,4-7.01,9.67-7.1,16.57 c-0.01,0.43,0,0.88,0.02,1.37c0.69,19.27,19.13,36.08,34.42,50.01c2.95,2.69,5.78,5.27,8.49,7.88l11.26,10.85l14.15-14.04 c2.28-2.26,4.86-4.73,7.62-7.37c4.69-4.5,9.91-9.49,14.77-14.52c3.49-3.61,6.8-7.24,9.61-10.73c2.76-3.42,5.02-6.67,6.47-9.57 c2.38-4.76,3.13-9.52,2.62-13.97c-0.5-4.39-2.23-8.49-4.82-11.99c-2.63-3.55-6.13-6.49-10.14-8.5C96.5,7.29,91.21,6.2,85.8,6.82 C76.47,7.9,71.5,13.17,65.46,19.57L65.46,19.57z M60.77,14.85C67.67,7.54,73.4,1.55,85.04,0.22c6.72-0.77,13.3,0.57,19.03,3.45 c4.95,2.48,9.27,6.1,12.51,10.47c3.27,4.42,5.46,9.61,6.1,15.19c0.65,5.66-0.29,11.69-3.3,17.69c-1.7,3.39-4.22,7.03-7.23,10.76 c-2.95,3.66-6.39,7.44-10,11.17C97.2,74.08,91.94,79.12,87.2,83.66c-2.77,2.65-5.36,5.13-7.54,7.29L63.2,107.28l-2.31,2.29 l-2.34-2.25l-13.6-13.1c-2.49-2.39-5.37-5.02-8.36-7.75C20.38,71.68,0.81,53.85,0.02,31.77C0,31.23,0,30.67,0,30.09 c0.12-8.86,3.66-16.18,9.21-21.36c5.5-5.13,12.97-8.13,21.01-8.42c0.55-0.02,1.13-0.03,1.74-0.02C46,0.48,52.42,6.63,60.77,14.85 L60.77,14.85z"
      //         />
      //       </g>
      //     </svg>
      //   </button>
      //   <button class="btn border-0">
      //     <svg
      //       data-encore-id="icon"
      //       role="img"
      //       aria-hidden="true"
      //       class="e-9890-icon e-9890-baseline"
      //       viewBox="0 0 16 16"
      //       style="fill: white"
      //       height="20"
      //     >
      //       <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
      //       <path
      //         d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"
      //       ></path>
      //     </svg>
      //   </button>
      //   <button class="btn border-0">
      //     <svg
      //       data-encore-id="icon"
      //       role="img"
      //       aria-hidden="true"
      //       class="e-9890-icon e-9890-baseline"
      //       viewBox="0 0 24 24"
      //       style="fill: white"
      //       height="20"
      //     >
      //       <path
      //         d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      //       ></path>
      //     </svg>
      //   </button>
      //   <button class="btn border-0 custom-grey ms-auto">
      //     Elenco
      //     <svg
      //       data-encore-id="icon"
      //       role="img"
      //       aria-hidden="true"
      //       class="e-9890-icon e-9890-baseline e-9890-icon--auto-mirror icon-bg"
      //       viewBox="0 0 16 16"
      //       style="fill: #6c757d"
      //       height="20"
      //     >
      //       <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"></path>
      //     </svg>
      //   </button>
      // </div>`;

      // console.log(album);
      // console.log(album.tracks.data);
      let i = 1;
      album.tracks.data.forEach((song) => {
        const li = document.createElement("li");
        li.className = "d-flex my3 ";

        const duration = song.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        li.innerHTML = `

          <div class="col-10 d-flex text-white">
          <p class="mb-0 me-2">${i}</p>
                <div>
                  <p class="fw-semibold mb-0 song">${song.title}</p>
                  <p class="mb-0 custom-grey">${song.artist.name}</p>
                </div>
            
          </div>
          <div class="col-2 d-flex justify-content-between text-white">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              class="e-9890-icon e-9890-baseline"
              viewBox="0 0 16 16"
              style="fill: white"
              height="20"
            >
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
              <path
                d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"
              ></path>
            </svg>
            <p>${minutes}:${seconds}</p>
          </div>
`;
        i++;
        olSongs.appendChild(li);
      });

      grandeContainer.appendChild(divTitolo);
      const songA = document.querySelectorAll(".song");
      console.log(songA);

      songA.forEach((s, index) => {
        s.addEventListener("click", function () {
          songPlayer(album, index);
        });
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

// myfun che chiama per riempire colonna sinistra e centrale
const myFun = function () {
  fetch(urlPlaylist, options)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Prodotti non trovati.");
        } else if (response.status >= 500) {
          throw new Error("Errore del server, riprova più tardi.");
        }
        throw new Error("Errore nella richiesta dei prodotti.");
      }
      return response.json();
    })
    .then((ogg2) => {
      fillSxColumn(ogg2);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

window.onload = function () {
  myFun();
  albumFun();
};
