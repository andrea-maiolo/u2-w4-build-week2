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

      artN.data.forEach((song) => {
        const cardlist = document.createElement("div");
        cardlist.className = "col-12 d-flex gy-3 align-items-center justify-content-between w-100";
        const duration = song.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        cardlist.innerHTML = `
      <div class="col-6 d-flex align-items-center">
                                        <img class="img-fluid rounded me-2"
                                            src="${song.album.cover_small}" alt="">

                                        <p class="m-0 text-white">${song.title}</p>
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
      });
    });
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
