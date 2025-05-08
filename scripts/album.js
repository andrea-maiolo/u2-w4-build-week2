const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";

// const arrayPlaylist = [578, 479, 352, 158, 160, 165, 166, 170, 180, 127, 12, 5, 13, 636, 864, 1679, 56434, 64321, 89463, 7455, 46453];

const urlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/155";

const rowCardLeft = document.getElementById("rowCardLeft");

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": token,
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

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
      console.log("playlist", ogg2);

      ogg2.tracks.data.forEach((track) => {
        console.log(track);

        const cardLeft = document.createElement("div");
        cardLeft.className = "col-12";

        cardLeft.innerHTML = `
<div class="d-flex">
<img src="${track.album.cover_small}" alt="songs.album.cover" style="width: 3rem; height: auto" class="me-2 rounded" />
<div>
<a class="text-decoratione-none " href="../album.html?=${track.album.id}" ><h6 class="d-inline-block text-white mb-1">${track.album.title}</h6></a>
<a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?=${track.artist.id}"><p style="color: #6c757d" class="mb-0">${track.artist.name}</p></a>
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

const params = new URLSearchParams(window.location.search);
const id = params.get("albumId");
const url2 = `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`;

const grandeContainer = document.getElementById("grandeContainer");
const piccoloContainer = document.getElementById("piccoloContainer");
const olSongs = document.getElementById("olSongs");

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
      divTitolo.className = "row bg-success align-items-center rounded py-4";

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

      const divPlayer = document.createElement("div");
      divPlayer.className = "row";

      divPlayer.innerHTML = `    
      <div class="col d-flex my-3">
        <button class="btn border-0 rounded-circle py-2" style="background-color:#1ED760">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            class="e-9890-icon e-9890-baseline"
            viewBox="0 0 16 16"
            style="fill: black"
            height="16"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
          </svg>
        </button>
        <button class="btn border-0">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 122.88 109.57"
            style="fill: white"
            height="20"
            xml:space="preserve"
          >
            <g>
              <path
                d="M65.46,19.57c-0.68,0.72-1.36,1.45-2.2,2.32l-2.31,2.41l-2.4-2.33c-0.71-0.69-1.43-1.4-2.13-2.09 c-7.42-7.3-13.01-12.8-24.52-12.95c-0.45-0.01-0.93,0-1.43,0.02c-6.44,0.23-12.38,2.6-16.72,6.65c-4.28,4-7.01,9.67-7.1,16.57 c-0.01,0.43,0,0.88,0.02,1.37c0.69,19.27,19.13,36.08,34.42,50.01c2.95,2.69,5.78,5.27,8.49,7.88l11.26,10.85l14.15-14.04 c2.28-2.26,4.86-4.73,7.62-7.37c4.69-4.5,9.91-9.49,14.77-14.52c3.49-3.61,6.8-7.24,9.61-10.73c2.76-3.42,5.02-6.67,6.47-9.57 c2.38-4.76,3.13-9.52,2.62-13.97c-0.5-4.39-2.23-8.49-4.82-11.99c-2.63-3.55-6.13-6.49-10.14-8.5C96.5,7.29,91.21,6.2,85.8,6.82 C76.47,7.9,71.5,13.17,65.46,19.57L65.46,19.57z M60.77,14.85C67.67,7.54,73.4,1.55,85.04,0.22c6.72-0.77,13.3,0.57,19.03,3.45 c4.95,2.48,9.27,6.1,12.51,10.47c3.27,4.42,5.46,9.61,6.1,15.19c0.65,5.66-0.29,11.69-3.3,17.69c-1.7,3.39-4.22,7.03-7.23,10.76 c-2.95,3.66-6.39,7.44-10,11.17C97.2,74.08,91.94,79.12,87.2,83.66c-2.77,2.65-5.36,5.13-7.54,7.29L63.2,107.28l-2.31,2.29 l-2.34-2.25l-13.6-13.1c-2.49-2.39-5.37-5.02-8.36-7.75C20.38,71.68,0.81,53.85,0.02,31.77C0,31.23,0,30.67,0,30.09 c0.12-8.86,3.66-16.18,9.21-21.36c5.5-5.13,12.97-8.13,21.01-8.42c0.55-0.02,1.13-0.03,1.74-0.02C46,0.48,52.42,6.63,60.77,14.85 L60.77,14.85z"
              />
            </g>
          </svg>
        </button>
        <button class="btn border-0">
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
        </button>
        <button class="btn border-0">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            class="e-9890-icon e-9890-baseline"
            viewBox="0 0 24 24"
            style="fill: white"
            height="20"
          >
            <path
              d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
            ></path>
          </svg>
        </button>
        <button class="btn border-0 custom-grey ms-auto">
          Elenco
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            class="e-9890-icon e-9890-baseline e-9890-icon--auto-mirror icon-bg"
            viewBox="0 0 16 16"
            style="fill: #6c757d"
            height="20"
          >
            <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"></path>
          </svg>
        </button>
      </div>`;

      console.log(album);
      console.log(album.tracks.data);
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
                  <p class="fw-semibold mb-0">${song.title}</p>
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
      grandeContainer.appendChild(divPlayer);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

window.onload = function () {
  myFun();
  albumFun();
};
