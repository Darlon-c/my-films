const result = document.getElementById('result')
const searchFilm = document.getElementById('searchFilm')
const btnSearch = document.getElementById('btnSearch')

const key = "a766a8b2"

async function getFilms() {
    const film = searchFilm.value.trim()

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&t=${film}`)
        const data = await response.json()

        console.log(data)

        result.innerHTML = `
            <div>
                <h2>${data.Title} (${data.Year})</h2>
                <img src="${data.Poster}" alt="${data.Title}">
                <p><strong>Diretor:</strong> ${data.Director}</p>
                <p><strong>Gênero:</strong> ${data.Genre}</p>
                <p><strong>Nota:</strong> ${data.imdbRating}</p>
                <p><strong>Sinopse:</strong> ${data.Plot}</p>
            </div>
            `
    } catch (error) {
        console.log(error)
    }
}

btnSearch.addEventListener('click', getFilms)