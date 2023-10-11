const httpMocks = require('node-mocks-http');
const tmdb = require('../../src/libs/tmdb')
const testConfig = require('../config/charactersWithMultipleActors.json')
const { charactersWithMultipleActors } = require('../../src/controllers/charactersWithMultipleActors')

//Mocking the call to the tmdb API with a predefined mock object.
jest.mock('../../src/libs/tmdb')
const mockedGetMoviesDetailsAndCastPositive1 = jest.spyOn(tmdb, 'getMoviesDetailsAndCast').mockImplementation(() => {
  return testConfig.getMoviesDetailsAndCastPositive
});

describe('charactersWithMultipleActors Controller', () => {
  it('Positive use case', async () => {
    //Mocking the response object used by the controller
    const positiveResponse = httpMocks.createResponse();
    await charactersWithMultipleActors(null, positiveResponse)
    
    expect(positiveResponse.statusCode).toEqual(200);
    expect(positiveResponse._getJSONData()["Johnny Storm / The Human Torch"]).toEqual(undefined);
    expect(positiveResponse._getJSONData()["Reed Richards / Mr. Fantastic"].length).toEqual(2);
  })  
})