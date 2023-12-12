import React from 'react'
import Header from '../components/Header'
import Course from '../components/Course'
import Approve from '../components/Approve'

function Admin() {
  return (
    <div>
        <Header />
        <div className='flex '>
        <Course />
        <Approve />
        </div>
    </div>
  )
}

export default Admin