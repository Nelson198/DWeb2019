/* Throw PUT request */
const edit = (id, movieCast, movieGenres) => {
    let title = document.getElementById("title").value
    let year = document.getElementById("year").value

    let cast = []
    if (movieCast.length !== 0) {
        for (let i = 0; i < movieCast.split(",").length; i++) {
            cast.push(document.getElementById(`actor${i}`).value)
        }
    }

    let genres = []
    if (movieGenres.length !== 0) {
        for (let i = 0; i < movieGenres.split(",").length; i++) {
            genres.push(document.getElementById(`genre${i}`).value)
        }
    }

    let movie = {
        _id: id,
        title: title,
        year: year,
        cast: cast,
        genres: genres
    }

    axios.put(`/filmes/${movie._id}`, movie)
        .then(() => window.location.assign(`/filmes/${movie._id}`))
        .catch(error => console.log(error))
}

/* Throw DELETE request */
const remove = (id) => {
    axios.delete(`/filmes/${id}`)
        .then(() => window.location.assign("/filmes"))
        .catch(error => console.log(error))
}