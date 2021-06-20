const mongoDBClient = require('mongodb').MongoClient
const urlParser = {useNewUrlParser: true} /* So that we don't run into any deprecation errors */
const url = 'mongodb://localhost:27017/'

module.exports = uri => (
  mongoDBClient.connect(url, urlParser).then(
    client => client.db(uri)
  ).catch(
    err => {
      console.log('There\'s been an error...', err)
      return null
    }
  )
)
