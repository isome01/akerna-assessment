import React, {useCallback, useState, useEffect} from 'react'
import BeverageList from '../common/BeverageList'
import UserSpecs from './UserSpecs'
import * as styles from './Dashboard.module.css'
import {fromJS, List, Map} from 'immutable'
import {getBeverageData} from '../api/beverages'
import {getUserSpecs, updateUserSpecs, refreshUserSpecs} from '../api/userSpecs'
import Favorites from '../common/Favorites'

const Dashboard = () => {
  const [id, setId] = useState(null)
  const [specs, setSpecs] = useState(Map())
  const [beverages, setBeverages] = useState(List())
  const [loading, setLoading] = useState(false)

  const onDeleteFavorite = useCallback(fav => {
    // send back specs to be updated with filtered list
    const prevSpecs = specs.toJS()
    prevSpecs['favorites'] = prevSpecs.favorites
      .filter(favorite => favorite !== fav)
    updateUserSpecs({...prevSpecs, _id: id})
      .then((res) => {
        setSpecs(fromJS(res))
      })
  }, [specs, id])

  const onAddFavorite = useCallback(name => {
    // first find if favorite is already in list
    const prevSpecs = specs.toJS()
    const hasSome = prevSpecs.favorites.some(f => f === name)
    if (!hasSome) {
      // send back specs to be updated with filtered list
      prevSpecs.favorites.push(name)
      setLoading(true)
      updateUserSpecs({...prevSpecs, _id: id})
        .then((res) => {
          setLoading(false)
          setSpecs(fromJS(res))
        })
    }
  }, [specs, id, setLoading])

  const onConsumeBeverage = useCallback(name => {
    // send back specs to be updated with filtered list
    const prevSpecs = specs.toJS()
    const consumedBeverage = beverages.toJS().find(b => b.name)
    prevSpecs['consumed'][consumedBeverage['db_name']] += 1

    setLoading(true)
    updateUserSpecs({...prevSpecs, _id: id})
      .then((res) => {
        setLoading(false)
        setSpecs(fromJS(res))
      })
  }, [specs, beverages, id])

  const onRefreshUserSpecs = useCallback(() => {
    setLoading(true)
    refreshUserSpecs(id)
      .then(
        res => {
          setLoading(false)
          setSpecs(fromJS(res))
        }
      )
  }, [id, setSpecs, setLoading])

  useEffect(() => {
    getUserSpecs()
      .then((res) => {
        setSpecs(fromJS(res.data))
        setId(res._id)
      })
  }, [setSpecs, setId])

  useEffect(() => {
    getBeverageData()
      .then(res => {
        setBeverages(fromJS(res))
      })
  }, [setBeverages])

  return (
    <div className='row'>
      <div className={`col-md-10 offset-md-1 ${styles['dashboard']}`}>
        <BeverageList
          beverages={beverages}
          className='col-md-12'
          style={{marginTop: 10, minHeight: 310}}
          onFavorite={onAddFavorite}
          onConsume={onConsumeBeverage}
          isLoading={loading}
        />
        <UserSpecs
          style={{marginTop: 50}}
          className='col-md-12'
          specs={specs}
          beverages={beverages}
          id={id}
          onRefresh={onRefreshUserSpecs}
        />
        <div className='row'>
          <Favorites
            className='col-sm-4'
            onDelete={onDeleteFavorite}
            favorites={specs.get('favorites', List())}
            style={{marginTop: 15}}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
