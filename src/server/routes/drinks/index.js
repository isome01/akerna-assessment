const beverageData = require('../../fixtures/beverages.json')

module.exports = function (app) {
  app.get('/drinks/list', function (req, res) {
    res.json(beverageData)
  })
}
