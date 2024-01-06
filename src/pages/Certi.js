import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Certi() {
  const { id } = useParams();
  const [certiData, setCertiData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [verifyLoading, setVerifyLoading] = useState()

  async function getCert() {
    try {
      await axios.post('http://localhost:8000/certi', {
        id
      }).then(res => {
        setCertiData(res.data)
        setIsLoading(false)
      })
    } catch (error) {

    }
  }
  async function verifyCerti(){
    setVerifyLoading(true)
    alert("Please wait verifing with blockchain")
    try{
      await axios.post('http://localhost:8000/verifyCerti',{
        id
      }).then(res=>{
        setVerifyLoading(false)
        alert("Verified with blockchain")
      })
    }catch(error){
      console.log(error)
    }
  } 
  useEffect(() => {
    getCert();
  })
  return (
    <div className='flex gap-16'>
      {isLoading ? <h1>Loading</h1> : <div className='flex w-[100%] h-screen items-center p-16'>


        <div className='w-[65%]'>  <h1 className='text-2xl'>Certificate</h1>  <h1>
          Student name: {certiData.userName}<br /></h1>
          Course Title: {certiData.title}<br />
          Enrolled Date: {certiData.enrollDate}<br />
          Issued Date: {certiData.issueDate}<br />
          Certificate Id: {certiData.issueId}</div>

        {certiData.verifiedStatus === "true" ? <div className='bg-green-300 p-8 pb-16 pt-8 rounded-lg border-2 border-slate-700  '><h1 className='text-xl font-bold py-2 text-center'>Verified</h1><h1 className='font-bold '>
          Transaction Hash: <p className='font-normal'>{certiData.transactionHash}</p></h1>
           <h1 className='font-bold'>Block Hash: </h1>{certiData.blockHash}<br />
           <h1 className='font-bold'>block Number: </h1>{certiData.blockNumber}<br />
           <h1 className='font-bold'>from: </h1>{certiData.from}<br /></div> : <div>
          <button onClick={verifyCerti} className='bg-slate-700 text-white p-2 hover:bg-slate-900 '>Verify with Blockchain</button>
        </div>}


      </div>}

    </div>

  )
}

export default Certi