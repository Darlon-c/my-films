const result = document.getElementById("result");
const searchFilm = document.getElementById("searchFilm");
const btnSearch = document.getElementById("btnSearch");
const btnWatchLater = document.getElementById("btnWatchLater");
const movieSelected = document.getElementById("movieSelected");

const stars = new StarRating(".star-rating");
const key = "a766a8b2";
let currentMovie = null;
let watchLater = [];

function loadStorage() {
  const saveData = localStorage.getItem("movie");

  if (saveData) {
    watchLater = JSON.parse(saveData);
  }
}

// consumindo a api e exibindo o filme pesquisado na tela
async function getFilms() {
  if (searchFilm.value === "") {
    alert("Informe o nome do filme");
    return;
  }

  const film = searchFilm.value.trim();

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&t=${film}`,
    );
    const data = await response.json();

    currentMovie = data;

    result.innerHTML = `
            <div>
                <h2>${data.Title} (${data.Year})</h2>
                <img src="${data.Poster}" alt="${data.Title}">
                <p><strong>Diretor:</strong> ${data.Director}</p>
                <p><strong>Gênero:</strong> ${data.Genre}</p>
                <p><strong>Nota:</strong> ${data.imdbRating}</p>
                <button class="border" onclick="addWatchLater()">Assistir mais tarde</button>
            </div>
            `;
  } catch (error) {
    console.log(error);
  }
}
// adicionando no array
function addWatchLater() {
  const exist = watchLater.some(
    (movie) => movie.imdbID === currentMovie.imdbID,
  );

  if (!exist) {
    watchLater.push(currentMovie);
    saveStorage();
    Swal.fire("Adicionado em assistir mais tarde");
  } else {
    Swal.fire("Este filme já está na sua lista!");
  }
}

// mostrar marcados com assistir mais tarde
function showMovie() {
  const render = watchLater.map((movie) => {
    return `
            <div>
                <div class="flex justify-between">
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <button class="bg-red-600" onclick="removeMovie('${movie.imdbID}')">X</button>
                </div>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <p><strong>Diretor:</strong> ${movie.Director}</p>
                <p><strong>Gênero:</strong> ${movie.Genre}</p>
                <select class="star-rating" data-imdb-id="${movie.imdbID}">
                    <option value="">Avaliar</option>
                    <option value="5">5 estrelas</option>
                    <option value="4">4 estrelas</option>
                    <option value="3">3 estrelas</option>
                    <option value="2">2 estrelas</option>
                    <option value="1">1 estrela</option>
                </select>
            </div>
            `;
  });

  movieSelected.innerHTML = render.join("");
  initStarRating();
}

// configuração da avaliação
function initStarRating() {
  if (typeof StarRating !== "undefined") {
    new StarRating(".star-rating", {
      classNames: {
        active: "gl-active",
        base: "gl-star-rating",
        selected: "gl-selected",
      },
      clearable: true,
      maxStars: 5,
      prebuilt: false,
      stars: null,
      tooltip: "Clique para avaliar",
    });
  }
}

// remover de assistir mais tarde
function removeMovie(imdbID) {
  watchLater = watchLater.filter((movie) => {
    return movie.imdbID !== imdbID;
  });
  showMovie();
  saveStorage();
}

function saveStorage() {
  localStorage.setItem("movie", JSON.stringify(watchLater));
}

loadStorage();
btnWatchLater.addEventListener("click", showMovie);
btnSearch.addEventListener("click", getFilms);
