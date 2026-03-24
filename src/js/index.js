const result = document.getElementById("result");
const searchFilm = document.getElementById("searchFilm");
const btnSearch = document.getElementById("btnSearch");
const btnWatchLater = document.getElementById("btnWatchLater");
const movieSelected = document.getElementById("movieSelected");

const key = "a766a8b2";
let currentMovie = null;
let watchLater = [];

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

function addWatchLater() {
    watchLater.push(currentMovie)
    console.log(watchLater)
}

function showMovie() {
    const render = watchLater.map((movie) => {
        return `
            <div>
                <h2>${movie.Title} (${movie.Year})</h2>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <p><strong>Diretor:</strong> ${movie.Director}</p>
                <p><strong>Gênero:</strong> ${movie.Genre}</p>
                <p><strong>Nota:</strong> ${movie.imdbRating}</p>
            </div>
            `;
    })

    movieSelected.innerHTML = render.join("")
}

btnWatchLater.addEventListener('click', showMovie)
btnSearch.addEventListener("click", getFilms);
