const urlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/155";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": token,
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const rowCardLeft = document.getElementById("rowCardLeft");

const fillSxColumn = function (ogg2) {
  for (let i = 0; i < 15; i++) {
    const track = ogg2.tracks.data[i];

    const cardLeft = document.createElement("div");
    cardLeft.className = "col-12";

    cardLeft.innerHTML = `
  <div class="d-flex">
  <img src="${track.album.cover_small}" alt="songs.album.cover" style="width: 3rem; height: auto" class="me-2 rounded" />
  <div>
  <a class="text-decoratione-none " href="../album.html?albumId=${track.album.id}" ><h6 class="d-inline-block text-white mb-1">${track.album.title}</h6></a>
  <a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?artistId=${track.artist.id}"><p style="color: #6c757d" class="mb-0">${track.artist.name}</p></a>
  </div>
  </div>
  `;
    rowCardLeft.appendChild(cardLeft);
  }
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
      fillSxColumn(ogg2);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const superContainer = document.getElementById("superContainer");

function eseguiRicerca() {
  const query = document.getElementById("search").value.trim();

  const urlquery = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;

  fetch(urlquery, options)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Canzoni non trovate.");
        } else if (response.status >= 500) {
          throw new Error("Errore del server, riprova più tardi.");
        }
        throw new Error("Errore nella richiesta.");
      }
      return response.json();
    })
    .then((ricerca) => {
      console.log(ricerca);

      ricerca.data.forEach((a) => {
        const div = document.createElement("div");
        div.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

        div.innerHTML = `
        <a href="../album.html?albumId=${a.album.id}">
          <div class="card text-bg-primary mb-3 position-relative w-100 overflow-hidden border-0" style="height: 175px">
            <h5 class="card-title p-3 text-truncate">${a.album.title}</h5>
            <img
              id="img-card-search"
              class="position-absolute w-50 rounded"
              style="right: -42px; bottom: 10px"
              src="${a.album.cover_small}"
              alt="card-search"
            />
          </div>
        </a>`;
        superContainer.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert(error.message);
    });
}

document.getElementById("searchButton").addEventListener("click", function (e) {
  e.preventDefault();
  eseguiRicerca();
});

document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    eseguiRicerca();
  }
});

window.onload = function () {
  myFun();
};
