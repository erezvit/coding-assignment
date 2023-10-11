const { get } = require('./api')
const tmdb = require('../config/tmdb.json')

const getMovieWithCastUrlAndParams = (movieId) => {
  if(!movieId) {
    throw new Error('No Movie id provided')
  }
  url = `${tmdb.baseUrl}/${tmdb.movieEndpointPath}/${movieId}`
  params = {}
  params[tmdb.apiKeyParamName] = process.env.tmdbApiKey
  params[tmdb.addCreditParameterName] = tmdb.creditsEndpointName
  return {url, params}
}

const getMovieDetailsAndCast = async (movieId) => {
  if(!movieId) {
    throw new Error('No Movie id provided')
  }
  const {url, params} = getMovieWithCastUrlAndParams(movieId)
  movieWithCredits = await get(url, params)
  return movieWithCredits
}

const getMoviesDetailsAndCast = async (movieIds) => {
  if(!movieIds || !Array.isArray(movieIds)) {
    throw new Error("getMoviesDetailsAndCast expects an array of movie ids and none was given")
  }
  const promises = []
  for(const movieId of movieIds) {
    promises.push(getMovieDetailsAndCast(movieId))
  }
  const moviesData = await Promise.all(promises)
  return moviesData
}

module.exports = {
  getMoviesDetailsAndCast
}