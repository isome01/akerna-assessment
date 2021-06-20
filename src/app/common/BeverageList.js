import React, {useState} from 'react'
import {fromJS, List} from 'immutable'
import {getBeverageData} from '../api/beverages'
import PropTypes from 'prop-types'


const BeverageList = ({className, style}) => {
  const [beverages, setBeverages] = useState(List())

  React.useEffect(() => {
    getBeverageData()
      .then(res => {
        setBeverages(fromJS(res))
      })
  }, [getBeverageData, setBeverages])

  return (
    <div className={`card ${className}`} style={style}>
      <h3>Beverages</h3>
      <ul className='list-group list-flush'>
        {beverages.toJS().map(beverage => {
          const {name} = beverage
          return (
            <li className='list-group-item' key={name}>
              <b>{name}</b>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BeverageList.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}

BeverageList.defaultProps = {
  className: '',
  style: {}
}

export default BeverageList
