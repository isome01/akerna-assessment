import React, {useCallback, useState} from 'react'
import BeverageList from '../common/BeverageList'
import UserSpecs from './UserSpecs'
import * as styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <div className='row'>
      <div className={`col-md-10 offset-md-1 ${styles['dashboard']}`}>
        <BeverageList />
        <UserSpecs
          style={{marginTop: 50}}
        />
      </div>
    </div>
  )
}

export default Dashboard
