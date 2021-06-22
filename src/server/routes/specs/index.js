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
  // update user specs
  app.post('/specs', function (req, res) {
    const specs = req.body.payload
    dal.updateSpecs(specs).then(results => {
      res.json(specs)
    })
  })
}
