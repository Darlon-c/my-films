const result = document.getElementById("result");
const searchFilm = document.getElementById("searchFilm");
const btnSearch = document.getElementById("btnSearch");

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

btnSearch.addEventListener("click", getFilms);
