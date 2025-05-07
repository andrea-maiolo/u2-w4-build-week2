const albumUrl = "https://deezerdevs-deezer.p.rapidapi.com/album/%7Bid%7D";

const albumFun = function () {
  fetch(albumUrl, options)
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
    .then((album) => {})
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};
