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
    const specs = req.body['payload']
    dal.updateSpecs(specs).then(results => {
      res.json(specs)
    })
  })

  // basic refresh of data
  app.post('/specs/refresh', function (req, res) {
    const id = req.body['payload']
    if (!id) {
      console.error('Missing user specs "id"')
      res.json({})
    } else {
      dal.updateSpecs({...userSpecs.data, _id: id}).then(results => {
        res.json(results)
      })
    }
  })
}
