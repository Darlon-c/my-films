const result = document.getElementById("result");
const searchFilm = document.getElementById("searchFilm");
const btnSearch = document.getElementById("btnSearch");

const key = "a766a8b2";
let favoritesMovies = []


async function getFilms() {
  if (searchFilm.value === "") {
    alert("Informe o nome do filme");
    return;
  }

  const film = searchFilm.value.trim();

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&s=${film}`,
    );
    const data = await response.json();

    console.log(data);

    const filmesHTML = data.Search.map(
      (films) => `
            <div class="flex items-center flex-col  border gap-4 rounded-lg">
                <h2 class="text-xl font-bold">${films.Title} (${films.Year})</h2>
                <img src="${films.Poster !== "N/A" ? films.Poster : "https://via.placeholder.com/300x450?text=Sem+Imagem"}" 
                     alt="${films.Title}" class="w-40">
            </div>
        `,
    ).join("");

    result.innerHTML = filmesHTML;
  } catch (error) {
    console.log(error);
  }
}

btnSearch.addEventListener("click", getFilms);
