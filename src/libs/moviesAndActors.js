const { movies, actors } = require('../../dataForQuestions')

const movieIds = Object.keys(movies).map(movieName => movies[movieName])

const moviesMapById = {}
for(const movieName of Object.keys(movies)) {
  moviesMapById[movies[movieName]] = movieName
}

const actorsMap = {}
for(const actor of actors) {
  actorsMap[actor] = true
}

module.exports = {
  movieIds,
  moviesMapById,
  actorsMap
}