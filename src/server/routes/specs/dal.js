const dbDriver = require('../../driver')
const ObjectId = require('mongodb').ObjectID
const userSpecs = require('../../fixtures/userSpecs.json')

const db_uri = 'caffeine_trip'
const db_collection = 'user_specs'

const dal = {}

const checkDate = date => {
  return (
    (date && new Date(date) >= new Date())
      ? 'future' : 'past'
  )
}


dal.createSpecs = () => {
  return dbDriver(db_uri).then(
    db => {
      return db.collection(db_collection).insertOne({...userSpecs}).then(
        res => {
          if (res.insertedCount >= 1) {
            console.log(`Specs with id "${res.ops[0]['_id']}" created for user.`)
            return userSpecs
          }
          return `Error: Specs not created.`
        }
      ).catch(
        err => {throw new Error(err)}
      )
    }
  ).catch(
    err => {throw new Error(err)}
  )
}

dal.getSpecs = () => {
  return dbDriver(db_uri).then(
    db => {
      return db.collection(db_collection).find().toArray().then(
        res => {
          console.log(res)
          // create user specs if not created already
          if (!res.length) {
            console.log('User Specs not found; attempting to create specs...')
            return dal.createSpecs()
              .then(res => res)
              .catch(res => res)
          }
          return res
        }
      ).catch(
        err => {throw new Error(err)}
      )
    }
  ).catch(
    err => {throw new Error(err)}
  )
}

module.exports = dal
