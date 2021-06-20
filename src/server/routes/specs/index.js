const userSpecs = require('../../fixtures/userSpecs.json')

module.exports = function (app) {

  // basic read for user specs
  app.get('/specs', function (req, res) {
    res.json(userSpecs)
  })

  // update user favorites
  app.post('/specs/favorites', function (req, res) {
    res.json({'message': ''})
  })

  // update consumed drinks for user specs
  app.post('/specs/consumed')
}
