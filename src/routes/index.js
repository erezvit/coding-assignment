const express = require('express')
const router = express.Router()
const { moviesPerActor } = require('../controllers/moviesPerActor')
const { actorsWithMultipleCharacters } = require('../controllers/actorsWithMultipleCharacters')
const { charactersWithMultipleActors } = require('../controllers/charactersWithMultipleActors')

// Health check route
router.get('/', (req, res, next) => {
  res.send('Health Check')
})

router.get('/moviesPerActor', moviesPerActor)
router.get('/actorsWithMultipleCharacters', actorsWithMultipleCharacters)
router.get('/charactersWithMultipleActors',charactersWithMultipleActors)


module.exports = router