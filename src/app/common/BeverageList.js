import React from 'react'
import {List} from 'immutable'
import PropTypes from 'prop-types'
import Loader from 'react-loader'

const BeverageList = ({className, style, beverages, onFavorite, onConsume, isLoading}) => (
  <div className={`card ${className}`} style={style}>
    <h3 style={{padding: 15}}>Beverages</h3>
    {(isLoading && <Loader />) ||
      <ul className='list-group list-flush'>
        {beverages.toJS().map(beverage => {
          const {name, description} = beverage
          return (
            <li className='list-group-item' key={name}>
              <b>{name}</b> - {description}
              <div className='float-right'>
                <>
                  <span
                    className='fas fa-star'
                    style={{color: '#cc0', marginRight: 5, cursor: 'pointer'}}
                    onClick={() => onFavorite(name)}
                  />
                  <span
                    className='fas fa-mug-hot'
                    style={{color: '#290', marginRight: 5, cursor: 'pointer'}}
                    onClick={() => onConsume(name)}
                  />
                </>
              </div>
            </li>
          )
        })}
      </ul>
    }
  </div>
)
BeverageList.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  beverages: PropTypes.instanceOf(List).isRequired,
  onFavorite: PropTypes.func.isRequired,
  onConsume: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

BeverageList.defaultProps = {
  className: '',
  style: {}
}

export default BeverageList
