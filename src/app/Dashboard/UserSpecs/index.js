import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Map, List, fromJS} from 'immutable'
import {getUserSpecs} from '../../api/userSpecs'
import * as styles from './UserSpecs.module.css'

const UserSpecs = ({className, style}) => {
  const [specs, setSpecs] = useState(Map())

  useEffect(() => {
    getUserSpecs()
      .then((res) => {
        setSpecs(fromJS(res))
      })
  }, [getUserSpecs, setSpecs])

  const favorites = specs.get('favorites', List())
  const consumed = specs.get('consumed', Map()).toJS()
  const drinkNames = Object.keys(consumed)
  let consumedTotal = 0
  drinkNames.forEach(name => {
    consumedTotal += consumed[name]
  })

  return (
    <div style={{width: '100%', ...style}} className={className}>
      <h3>My Specs</h3>
      <div style={{marginTop: 35}}>
        <h4>Consumed Beverages:</h4>
        <div>Consumed Drinks Total:&nbsp;<span className='text-primary'>{consumedTotal}</span></div>
        <div>Caffeine consumption:&nbsp;
          <span className={'text-primary'}>{consumedTotal} mg</span>
        </div>
      </div>
      <div style={{marginTop: 35}}>
        <h4>Favorites:</h4>
        <ul>{favorites.map(favorite => favorite)}</ul>
      </div>
    </div>
  )
}

UserSpecs.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}

UserSpecs.defaultProps = {
  className: '',
  style: {}
}

export default UserSpecs
