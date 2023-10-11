const httpMocks = require('node-mocks-http');
const tmdb = require('../../src/libs/tmdb')
const testConfig = require('../config/moviesPerActor.json')
const { moviesPerActor } = require('../../src/controllers/moviesPerActor')

//Mocking the call to the tmdb API with a predefined mock object.
jest.mock('../../src/libs/tmdb')
const mockedGetMoviesDetailsAndCastPositive1 = jest.spyOn(tmdb, 'getMoviesDetailsAndCast').mockImplementation(() => {
  return testConfig.getMoviesDetailsAndCastPositive
});

describe('moviesPerActor Controller', () => {
  it('Positive use case', async () => {
    //Mocking the response object used by the controller
    const positive1response = httpMocks.createResponse();
    await moviesPerActor(null, positive1response)
    
    expect(positive1response.statusCode).toEqual(200);
    expect(positive1response._getJSONData()["Chris Evans"].length).toEqual(2);
    expect(positive1response._getJSONData()["Ioan Gruffudd"]).toEqual(undefined);
    expect(positive1response._getJSONData()["Jessica Alba"]).toEqual(undefined);
    expect(positive1response._getJSONData()["Robert Downey Jr."].length).toEqual(1);
    expect(positive1response._getJSONData()["Robert Downey Jr."][0]).toEqual("Iron Man");
  })  
})