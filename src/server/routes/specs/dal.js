const dbDriver = require('../../driver')
const ObjectId = require('mongodb').ObjectID
const userSpecs = require('../../fixtures/userSpecs.json')

const db_uri = 'caffeine_trip'
const db_collection = 'user_specs'

// simple previous date checker
const isPastDate = date => date && new Date(date) < new Date()

const dal = {}

dal.createSpecs = () => {
  return dbDriver(db_uri).then(
    db => {
      return db.collection(db_collection).insertOne({...userSpecs}).then(
        res => {
          if (res.insertedCount >= 1) {
            const specs = res.ops[0]
            console.log(`Specs with id "${specs['_id']}" created for user.`)
            return specs
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
              .catch(err => err)
          }
          return res[0]
        }
      ).catch(
        err => {throw new Error(err)}
      )
    }
  ).catch(
    err => {throw new Error(err)}
  )
}

dal.updateSpecs = specs => {
  const id = specs._id
  const {favorites, consumed} = specs

  return dbDriver(db_uri).then(
    db => {
      db.collection(db_collection).findOne({
        _id: ObjectId(id)
      }).then(
        res => {
          if (res !== null) {
            db.collection(db_collection).updateOne({
              '_id': ObjectId(id)
            }, {$set: {
                'data': {favorites, consumed},
              }}, {}).then(
              result => {
                const {matchedCount, modifiedCount} = result
                if (!matchedCount || !modifiedCount) {
                  console.log('Unable to update specs')
                } else {
                  console.log('Updated user specs.')
                }
                return {...userSpecs, ...specs}
              },
              err => err
            ).catch(
              err => {throw new Error(err)}
            )
          } else {
            console.warn(`User Specs with id ${id} not found. Response ${res}`)
          }
        },
      ).catch(
        err => err
      )
    }
  )
}

module.exports = dal
