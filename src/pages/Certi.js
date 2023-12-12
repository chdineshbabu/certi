import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Certi() {
  const {id} = useParams();
  const [certiData,setCertiData] = useState()
  const [isLoading,setIsLoading] = useState(true)

  async function getCert(){
    try {
      await axios.post('http://localhost:8000/certi',{
        id
      }).then(res=>{
        setCertiData(res.data)
        setIsLoading(false)
      })
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getCert();
  })
  return (
    <div>
    {isLoading ?<h1>Loading</h1>:<div>    <h1>
      Student name: {certiData.userName}<br/></h1>
      Course Title: {certiData.title}<br />
      Enrolled Date: {certiData.enrollDate}<br />
      Issued Date: {certiData.issueDate}<br/>
      Certificate Id: {certiData.issueId}</div>}

    </div>

  )
}

export default Certi