const { movieIds, moviesMapById, actorsMap} = require('../libs/moviesAndActors')
const { getMoviesDetailsAndCast } = require('../libs/tmdb')

//Returning an object representing actors which have played multiple 
//characters in the relevant movies.
//Response structure: { actorName: [{movieName, characterName}] }
const actorsWithMultipleCharacters = async (req, res, next) => {
   try {
    //Fetching the relevant movies info, including their cast.
    const moviesData = await getMoviesDetailsAndCast(movieIds)
    const actorsCharacters = {}
    for(const movie of moviesData) {
      const movieName = moviesMapById[movie.id]
      //Saving the different characters each actor has been played.
      for(const currentActor of movie.credits.cast) {
        if(actorsMap[currentActor.name]) {
          //remove parentheses and the text between them in the character name + removing quotes.
          const characterName = currentActor.character.replace(/ *\([^)]*\) */g, "").replace(/["']/g, "")
          if(!actorsCharacters[currentActor.name]){
            actorsCharacters[currentActor.name] = {}
            actorsCharacters[currentActor.name][characterName] = movieName
            
          }
          else {
            if(!actorAlreadyPlayedThischaracter(Object.keys(actorsCharacters[currentActor.name]), characterName)) {
              actorsCharacters[currentActor.name][characterName] = movieName
            }
          }
        }
      }
    }

    //selecting, restructuring and returning the relevant actors, which have been
    //played mutiple characters.
    const response = {}
    for(const actorName of Object.keys(actorsCharacters)) {
      if(Object.keys(actorsCharacters[actorName]).length > 1) {
        const characters = []
        for(const characterName of Object.keys(actorsCharacters[actorName])) {
          characters.push({
            movieName: actorsCharacters[actorName][characterName],
            characterName: characterName
          })
        }
        response[actorName] = characters
      }
    }
    res.json(response)
  }
  catch (err) {
    next(`Error getting actors playing multiple characters: ${err.message || err}`)
  }
}

//This function replaces the naive string comparison, in order to understand
//if the given character name has been played by the actor already.
//Using the naive string comparison will produce a different result.
const actorAlreadyPlayedThischaracter = (givenCharacterNames, newCharacterName) => {
  //handle multiple character names/parts like "Johnny Storm / Human Torch"
  const characterNameParts = newCharacterName.split(' / ')
  for(const characterNamePart of characterNameParts) {
    for(givenCharacterName of givenCharacterNames) {
      if(givenCharacterName.toLowerCase().includes(characterNamePart.toLowerCase())) {
        return true
      }
    }
  }
  return false
}

module.exports = {
  actorsWithMultipleCharacters
}