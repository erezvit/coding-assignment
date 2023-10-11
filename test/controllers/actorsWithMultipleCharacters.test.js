const httpMocks = require('node-mocks-http');
const tmdb = require('../../src/libs/tmdb')
const testConfig = require('../config/actorsWithMultipleCharacters.json')
const { actorsWithMultipleCharacters } = require('../../src/controllers/actorsWithMultipleCharacters')

//Mocking the call to the tmdb API with a predefined mock object.
jest.mock('../../src/libs/tmdb')
const mockedGetMoviesDetailsAndCastPositive1 = jest.spyOn(tmdb, 'getMoviesDetailsAndCast').mockImplementation(() => {
  return testConfig.getMoviesDetailsAndCastPositive
});

describe('actorsWithMultipleCharacters Controller', () => {
  it('Positive use case', async () => {
    //Mocking the response object used by the controller
    const positiveResponse = httpMocks.createResponse();
    await actorsWithMultipleCharacters(null, positiveResponse)
    
    expect(positiveResponse.statusCode).toEqual(200);
    expect(positiveResponse._getJSONData()["Robert Downey Jr."]).toEqual(undefined);
    expect(positiveResponse._getJSONData()["Miles Teller"]).toEqual(undefined);
    expect(positiveResponse._getJSONData()["Michael B. Jordan"].length).toEqual(2);
  })  
})