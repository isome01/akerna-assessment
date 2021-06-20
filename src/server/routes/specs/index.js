const userSpecs = require('../../fixtures/userSpecs.json')
const dal = require('./dal')

module.exports = function (app) {

  // basic read for user specs
  app.get('/specs', function (req, res) {
    dal.getSpecs().then(results => {
        res.json(results)
      }
    )
  })
  // update user favorites
  app.post('/specs/favorites', function (req, res) {
    res.json({'message': ''})
  })

  // update consumed drinks for user specs
  app.post('/specs/consumed')
}
