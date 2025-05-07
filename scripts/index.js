const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": token,
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const rowCardLeft = document.getElementById("rowCardLeft");
const rowCenter = document.getElementById("rowCenter");
const sectionListenNow = document.getElementById("sectionListenNow");
const sectionListenRecently = document.getElementById("sectionListenRecently");

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
    .then((ogg) => {
      ogg.data.forEach((songs) => {
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
      for (let i = 0; i <= 7; i++) {
        const songs = ogg.data[i];
        const cardCenter = document.createElement("div");
        cardCenter.className = "col-6 col-xxl-3";

        cardCenter.innerHTML = `
              <div class="d-flex bgGrey rounded align-items-center">
                  <img src="${songs.album.cover_small}" alt="songs.album.cover" style="width: 3rem; height: auto" class="me-2 rounded-start" />
                  <div>
                    <a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?=${songs.artist.id}"><h6 class="d-inline-block text-white">${songs.artist.name}</h6></a>
                  </div>
                </div>
              `;
        rowCenter.appendChild(cardCenter);
      }
      for (let i = 0; i <= 5; i++) {
        const songs = ogg.data[i];
        const cardSectionListenNow = document.createElement("div");
        cardSectionListenNow.className = "col-lg-2";

        cardSectionListenNow.innerHTML = `
              <div class="card border-0" style="background-color: #212121">
                  <img src="${songs.album.cover_medium}" class="card-img-top" alt="songs.album.cover" />
                  <div class="card-body px-0">
                   <a class="text-decoratione-none link-underline link-underline-opacity-0" href="../album.html?=${songs.album.id}" > <p class="card-text custom-grey">${songs.album.title}</p></a>
                  </div>
                </div>
              `;
        sectionListenNow.appendChild(cardSectionListenNow);
      }
      for (let i = 0; i <= 5; i++) {
        const songs = ogg.data[i];
        const cardSectionListenRecently = document.createElement("div");
        cardSectionListenRecently.className = "col-lg-2";

        cardSectionListenRecently.innerHTML = `
              <div class="card border-0" style="background-color: #212121">
                  <img src="${songs.artist.picture_medium}" class="card-img-top" alt="songs.album.cover" />
                  <div class="card-body px-0">
                    <a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?=${songs.artist.id}"><p class="card-text custom-grey">${songs.artist.name}</p></a>
                  </div>
                </div>
              `;
        sectionListenRecently.appendChild(cardSectionListenRecently);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

window.onload = function () {
  myFun();
};
