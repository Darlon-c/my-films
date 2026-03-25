const result = document.getElementById("result");
const searchFilm = document.getElementById("searchFilm");
const btnSearch = document.getElementById("btnSearch");
const btnWatchLater = document.getElementById("btnWatchLater");
const movieSelected = document.getElementById("movieSelected");

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
    Swal.fire("Ops!", "Informe o nome do filme", "warning");
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
            <div class="bg-slate-800 p-4 rounded-xl border border-slate-700 animate-in fade-in duration-500">
            <img src="${data.Poster}" alt="${data.Title}" class="w-full h-64 object-cover rounded-lg mb-4 shadow-md">
            <h2 class="text-lg font-bold leading-tight mb-1">${data.Title} <span class="text-slate-400 font-normal">(${data.Year})</span></h2>
            <div class="text-xs space-y-1 mb-4 text-slate-300">
                <p><strong>Diretor:</strong> ${data.Director}</p>
                <p><strong>Gênero:</strong> ${data.Genre}</p>
                <p class="text-yellow-500 font-bold">IMDb: ${data.imdbRating}</p>
            </div>
            <button class="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer border border-slate-600" onclick="addWatchLater()">
                + Adicionar à Lista
            </button>
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
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all group">
            <div class="relative overflow-hidden">
                <img src="${movie.Poster}" alt="${movie.Title}" class="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500">
                <button 
                    class="absolute top-2 w-6 h-6 mr-2 right-2 bg-red-600/90 hover:bg-red-500  rounded-full text-white shadow-lg transition-colors cursor-pointer" 
                    onclick="removeMovie('${movie.imdbID}')"
                >x
                </button>
            </div>
            
            <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-bold text-md mb-2 line-clamp-1">${movie.Title}</h3>
                <div class="text-[11px] text-slate-400 mb-4 flex-1">
                    <p><strong>Diretor:</strong> ${movie.Director}</p>
                    <p><strong>Gênero:</strong> ${movie.Genre}</p>
                </div>

                <div class="mt-auto pt-4 border-t border-slate-800">
                    <p class="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2 text-center">Sua Avaliação</p>
                    <select class="star-rating" data-imdb-id="${movie.imdbID}">
                        <option value="">Avaliar</option>
                        <option value="5">5 estrelas</option>
                        <option value="4">4 estrelas</option>
                        <option value="3">3 estrelas</option>
                        <option value="2">2 estrelas</option>
                        <option value="1">1 estrela</option>
                    </select>
                </div>
            </div>
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
