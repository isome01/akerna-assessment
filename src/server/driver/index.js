const mongoDBClient = require('mongodb').MongoClient
const urlParser = {useNewUrlParser: true}
const url = 'mongodb://localhost:27017/caffeine_trip'

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
