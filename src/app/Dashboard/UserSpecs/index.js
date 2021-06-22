import React from 'react'
import PropTypes from 'prop-types'
import {Map, List} from 'immutable'
import * as styles from './UserSpecs.module.css'

const UserSpecs = ({className, style, specs, beverages}) => {
  const consumed = specs.get('consumed', Map()).toJS()

  const drinkNames = beverages.toJS().map(b => b.name)
  let consumedTotal = 0
  let mgTotal = 0
  drinkNames.forEach(name => {
    const beverage = beverages.toJS().find(b => b['name'] === name)
    const drinksConsumed = consumed[beverage['db_name']] || 0
    consumedTotal += drinksConsumed
    mgTotal += (consumed[beverage['db_name']] * (beverage['serving_size'] * beverage['caffeine']))
  })

  const labelClass = mgTotal > 400 ? (
    mgTotal < 500 ? styles['warning-zone'] : styles['danger-zone']
  ) : 'text-primary'

  return (
    <div style={{width: '100%', ...style}} className={className}>
      <h3>My Specs</h3>
      <div style={{marginTop: 35}}>
        <h5>Consumed Beverages:</h5>
        <div>Consumed Drinks Total:&nbsp;<span className='text-primary'>{consumedTotal}</span></div>
        <div>Caffeine consumption:&nbsp;
          <span className={labelClass}>{mgTotal} mg</span>
        </div>
      </div>
    </div>
  )
}

UserSpecs.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  specs: PropTypes.instanceOf(Map).isRequired,
  beverages:  PropTypes.instanceOf(List).isRequired
}

UserSpecs.defaultProps = {
  className: '',
  style: {}
}

export default UserSpecs
