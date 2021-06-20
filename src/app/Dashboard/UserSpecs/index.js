import React, {useEffect, useState} from 'react'
import {Map, fromJS} from 'immutable'
import {getUserSpecs} from '../../api/userSpecs'

const UserSpecs = props => {
  const [specs, setSpecs] = useState(Map())

  useEffect(() => {
    getUserSpecs()
      .then((res) => {
        setSpecs(fromJS(res))
      })
  })

  return (
    <div style={{width: '100%'}}>
      <h3>Consumed</h3>
      <div>
      </div>
    </div>
  )
}

export default UserSpecs
