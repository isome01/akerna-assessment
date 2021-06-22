import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'immutable'


const Favorites = ({style, className, favorites, onDelete}) => {
  return (
    <div style={style} className={` ${className}`}>
      <h5>Favorites:</h5>
      <ul className='list-group list-flush' style={{width: '100%'}}>
        {(favorites || []).map((fav, i) => (
          <li
            style={{padding: 5}}
            key={`${fav}-${i}`}
            className='list-group-item'
          >
            {fav}
            <span
              onClick={() => onDelete(fav)}
              className='float-right far fa-minus-square'
              style={{color: '#e20', marginRight: 5, cursor: 'pointer'}}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

Favorites.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  favorites: PropTypes.instanceOf(List).isRequired,
  onDelete: PropTypes.func.isRequired
}

Favorites.defaultProps = {
  className: '',
  style: {},
}

export default Favorites
