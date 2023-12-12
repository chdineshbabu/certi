import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Approve() {
  const navigate = useNavigate()
  const [data,setData] = useState([])
  async function enroll(){
    await axios.post("http://localhost:8000/enrolled",{
    }).then(res=>{
      setData(res.data)
      console.log(res.data)
    })
  }

  useEffect(() => {
    enroll();
  }, [])
  async function issue(userName,userId,courseId,title,enrollDate,enrollId){
    await axios.post("http://localhost:8000/issue",{
      userName,userId,courseId,title,enrollDate,enrollId
    }).then(res=>{
      alert("Issued certificate 'Ok' to redirect")
      console.log(res.data)
      navigate('/certi/'+res.data)
    })
  }
  return (
    <div className='w-[45%] my-8 mr-18 p-12 shadow-2xl justify-center text-center'>
      <h1 className='text-lg my-2 font-semibold'>Cretificate Approvel</h1>
      {data.map((item, index) => (
      <div className='p-4 flex flex-row w-[100%] justify-between border-2 shadow-md' key={index}>
      
        <div className='flex flex-col' >
          <h1>Student name:{item.userName}</h1>
          <h1>Course name:{item.courseId}</h1>
          <h1>Progress:</h1>
        </div>
        <div>
          <h1 className='text-xs w-32'>Enrolled Time:{item.enrollDate}</h1>
          <button className='my-4 p-2 bg-slate-800 text-white' onClick={()=>issue(item.userName,item.userId,item.courseId,item.title,item.enrollDate,item.enrollId,)}>Issue Cretificate</button>
        </div>

      </div>))}
    </div>
  )
}

export default Approve