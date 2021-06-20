import React, {useCallback, useState} from 'react'
import BeverageList from '../common/BeverageList'
import UserSpecs from './UserSpecs'
import * as styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <div className='row'>
      <div className={`col-md-4 offset-md-4 ${styles['dashboard']}`}>
        <BeverageList />
        <UserSpecs />
      </div>
    </div>
  )
}

export default Dashboard
