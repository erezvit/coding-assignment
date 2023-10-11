const { movieIds, moviesMapById, actorsMap} = require('../libs/moviesAndActors')
const { getMoviesDetailsAndCast } = require('../libs/tmdb')

//Returning an object representing the relevant movies each
//actor played in. 
//Response structure: { actorName: [movies names] }
const moviesPerActor = async (req, res, next) => {
  try {
    //Fetching the relevant movies info, including their cast.
    const moviesData = await getMoviesDetailsAndCast(movieIds)
    const actorsMovies = {}
    //Saving the list of movies each relevant actor has been played in.
    for(const movie of moviesData) {
      const movieName = moviesMapById[movie.id]
      for(const currentActor of movie.credits.cast) {
        if(actorsMap[currentActor.name]) {
          if(!actorsMovies[currentActor.name]) {
            actorsMovies[currentActor.name] = []
          }
          actorsMovies[currentActor.name].push(movieName)
        }
      }
    }
    res.json(actorsMovies)
  }
  catch (err) {
    next(`Error getting movies per actor: ${err.message || err}`)
  }
}

module.exports = {
  moviesPerActor
}