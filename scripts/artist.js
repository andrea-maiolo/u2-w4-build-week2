const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";
const params = new URLSearchParams(window.location.search);
const id = params.get("artistId");
const url2 = `https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`;

const rowCardLeft = document.getElementById("rowCardLeft");
const copertina = document.getElementById("copertina");
const listSong = document.getElementById("listSong");

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": token,
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const myFun = function () {
  fetch(url, options)
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
      ogg2.data.forEach((songs) => {
        const cardLeft = document.createElement("div");
        cardLeft.className = "col-12";

        cardLeft.innerHTML = `
      <div class="d-flex">
      <img src="${songs.album.cover_small}" alt="songs.album.cover" style="width: 3rem; height: auto" class="me-2 rounded" />
      <div>
      <a class="text-decoratione-none " href="../album.html?=${songs.album.id}" ><h6 class="d-inline-block text-white mb-1">${songs.album.title}</h6></a>
      <a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?=${songs.artist.id}"><p style="color: #6c757d" class="mb-0">${songs.artist.name}</p></a>
      </div>
      </div>
      `;
        rowCardLeft.appendChild(cardLeft);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const myFunSongs = function (nameA) {
  const artistTracks = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${nameA}`;

  fetch(artistTracks, options)
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

    .then((artN) => {
      console.log(artN);
      let i;
      for (i = 0; i < artN.data.length; i++) {
        const song = artN.data[i];
        const cardlist = document.createElement("div");
        cardlist.className = "col-12 d-flex gy-3 align-items-center justify-content-between w-100";

        const duration = song.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        cardlist.innerHTML = `
      <div class="col-6 d-flex align-items-center">
                                        <img class="img-fluid rounded me-2"
                                            src="${song.album.cover_small}" alt="">
                                          <p class="m-0 text-white song" >${song.title}</p>
                                        
                                    </div>

                                    <div class="col-3">
                                        <p class="m-0 custom-grey">${song.rank}</p>
                                    </div>

                                    <div class="col-3 d-flex justify-content-end align-items-center "><button
                                            class="btn text-white">
                                            <svg data-encore-id="icon" role="img" aria-hidden="true"
                                                class="e-9890-icon e-9890-baseline" viewBox="0 0 16 16"
                                                style="fill:#6c757d" height="20">
                                                <path
                                                    d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z">
                                                </path>
                                                <path
                                                    d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z">
                                                </path>
                                            </svg>
                                        </button>
                                        <p class="m-0 custom-grey">${minutes}:${seconds} </p>
                                    </div>
      `;

        listSong.appendChild(cardlist);
      }

      const songA = document.querySelectorAll(".song");
      songA.forEach((s, index) => {
        s.addEventListener("click", function () {
          songPlayer(artN, index);
        });
      });
    });
};

const songPlayer = function (s, i) {
  console.log(s);
  console.log(i);
  const player = document.getElementById("player");
  const divPlayer = document.createElement("div");
  player.innerHTML = ``;
  divPlayer.className = "row align-items-center";
  divPlayer.innerHTML = `<div class="col-3 text-white">
                <div class="row align-items-center">
                    <div class="col-4">
                        <img src="${s.data[i].album.cover}" class="img-fluid p-3" alt="imgage brano">
                    </div>
                    <div class="col-8">
                        <div class="row align-items-center">
                            <div class="col py-3">
                                <h3 class="m-0">${s.data[i].title}</h3>
                                <p>${s.data[i].artist.name}</p>

                            </div>
                            <div class="col d-flex align-items-center">
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
                    <button class="btn bg-light rounded-circle">
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
                    <p class="m-0">0:30</p>
                    <div class="progress mx-3" style="height: 5px; width: 100%;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25"
                            aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="m-0">2:50</p>
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
                    <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25"
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
};

const myFunArtist = function () {
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
    .then((art) => {
      console.log(art);
      const cardcenter = document.createElement("div");
      cardcenter.className = "col-12";
      cardcenter.style.backgroundImage = `url('${art.picture_big}')`;
      cardcenter.style.backgroundSize = "cover";
      cardcenter.style.backgroundRepeat = "no-repeat";
      cardcenter.style.backgroundPosition = "center";

      cardcenter.innerHTML = `
      <div class="col text-white pt-5 ">
                            <p class="m-0"><svg data-encore-id="verifiedBadge" role="img" aria-hidden="false"
                                    class="e-9890-icon e-9890-baseline encore-announcement-set b0NcxAbHvRbqgs2S8QDg"
                                    viewBox="0 0 24 24" style="fill:#4CB3FF; height: 20;">

                                    <path
                                        d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z">
                                    </path>
                                </svg>Artista verificato</p>
                            <h1 class="fw-bold display-3 m-0">${art.name}</h1>
                            <p>${art.id}</p>

                        </div>
      `;
      copertina.appendChild(cardcenter);
      myFunSongs(art.name);
    });
};

window.onload = function () {
  myFun();
  myFunArtist();
};
