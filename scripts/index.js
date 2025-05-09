// DA AGGIUSTARE ALBUM ID PER PASSARE ALLA PAGINA DOPO
// !!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!
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

const rowCardLeft = document.getElementById("rowCardLeft");
const rowCenter = document.getElementById("rowCenter");
const sectionListenNow = document.getElementById("sectionListenNow");
const sectionListenRecently = document.getElementById("sectionListenRecently");

// link per playlist fetch
const urlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/155";

// riempimento colonna sinistra
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
    <img src="${track.album.cover_small}" alt="songs.album.cover" class="rounded" />
    `;
    listSideBarCollapsed.appendChild(iconAlbum);
  }
};

// riempimento colonna centrale
const fillCenterColumn = function (ogg2) {
  console.log(ogg2);

  for (let i = 15; i <= 22; i++) {
    const songs = ogg2.tracks.data[i];
    const cardCenter = document.createElement("div");
    cardCenter.className = "col-6 col-xxl-3";

    cardCenter.innerHTML = `
                  <div class="d-flex bgGrey rounded align-items-center">
                      <img src="${songs.album.cover_small}" alt="songs.album.cover" style="width: 3rem; height: auto" class="me-2 rounded-start" />
                      <div>
                        <a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?artistId=${songs.artist.id}"><h6 class="d-inline-block text-white">${songs.artist.name}</h6></a>
                      </div>
                    </div>
                  `;
    rowCenter.appendChild(cardCenter);
  }
  for (let i = 38; i <= 43; i++) {
    const songs = ogg2.tracks.data[i];
    const cardSectionListenNow = document.createElement("div");
    cardSectionListenNow.className = "col-6 col-sm-4 col-md-3 col-lg-2";

    cardSectionListenNow.innerHTML = `
                  <div class="card border-0" style="background-color: #212121">
                      <img src="${songs.album.cover_medium}" class="card-img-top" alt="songs.album.cover" />
                      <div class="card-body px-0">
                       <a class="text-decoratione-none link-underline link-underline-opacity-0" href="../album.html?albumId=${songs.album.id}" > <p class="card-text custom-grey text-truncate">${songs.album.title}</p></a>
                      </div>
                    </div>
                  `;
    sectionListenNow.appendChild(cardSectionListenNow);
  }
  for (let i = 44; i <= 49; i++) {
    const songs = ogg2.tracks.data[i];
    const cardSectionListenRecently = document.createElement("div");
    cardSectionListenRecently.className = "col-6 col-sm-4 col-md-3 col-lg-2";

    cardSectionListenRecently.innerHTML = `
                  <div class="card border-0" style="background-color: #212121">
                      <img src="${songs.album.cover_medium}" class="card-img-top" alt="songs.album.cover" />
                      <div class="card-body px-0">
                        <a class="text-decoratione-none link-underline link-underline-opacity-0 "href="../artist.html?artistId=${songs.artist.id}"><p class="card-text custom-grey  text-truncate">${songs.artist.name}</p></a>
                      </div>
                    </div>
                  `;
    sectionListenRecently.appendChild(cardSectionListenRecently);
  }
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
      fillCenterColumn(ogg2);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

window.onload = function () {
  myFun();
};
