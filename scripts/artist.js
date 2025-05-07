const artistUrl = "https://deezerdevs-deezer.p.rapidapi.com/artist/id";

const artistFun = function () {
  fetch(artistUrl, options)
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
    .then((artist) => {})
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};
