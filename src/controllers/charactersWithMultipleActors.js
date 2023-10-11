const { movieIds, moviesMapById, actorsMap} = require('../libs/moviesAndActors')
const { getMoviesDetailsAndCast } = require('../libs/tmdb')

//Returning an object representing characters in the relevant movies
//which have played by multiple actors.
//Response structure: { characterName: [{movieName, actorName}] }
const charactersWithMultipleActors = async (req, res, next) => {
  try {
    //Fetching the relevant movies info, including their cast.
    const moviesData = await getMoviesDetailsAndCast(movieIds)

    const characters = {}
    for(const movie of moviesData) {
      const movieName = moviesMapById[movie.id]
      //Saving the various players played each character.
      for(const currentActor of movie.credits.cast) {
        if(actorsMap[currentActor.name]) {
          if(!characters[currentActor.character]) {
            characters[currentActor.character] = {}
            characters[currentActor.character][currentActor.name] = movieName
          }
          else {
            if(!Object.keys(characters[currentActor.character]).includes(currentActor.name)) {
              characters[currentActor.character][currentActor.name] = movieName
            }
          }
        }
      }
    }

    //selecting, restructuring and returning the relevant characters, which have been
    //played by mutiple characters.
    const response = {}
    for(const characterName of Object.keys(characters)) {
      if(Object.keys(characters[characterName]).length > 1) {
        const actors = []
        for(const actorName of Object.keys(characters[characterName])) {
          actors.push({
            movieName: characters[characterName][actorName],
            actorName: actorName
          })
        }
        response[characterName] = actors
      }
    }
    res.json(response)
  }
  catch (err) {
    next(`Error getting charcaters played by multiple actors: ${err.message || err}`)
  }
}

module.exports = {
  charactersWithMultipleActors
}