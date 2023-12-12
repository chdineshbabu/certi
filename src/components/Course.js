import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Course() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [dec, setDec] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [fetch,setFetch] = useState([])


  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/course", {
        title, dec, price, duration
      }).then(res => {
        if (res.data === 'Added') {
          alert("New course added")
          navigate(0)
        } else {
          alert("Failed to add, try again")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchData(){
    try {
      await axios.post("http://localhost:8000/courseList",{
      }).then(res=>{
        if(res.data){
          setFetch(res.data)
        }else{
          console.log("failed to Fetch")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <div className='w-[35%] my-8 mx-28 shadow-2xl justify-center'>
      <div className=''>
        <div className='flex flex-col p-12 text-center'>
          <h1 className='text-lg font-semibold'>Add New course</h1>
          <form className='mt-4' action='POST'>
            <input className='border-2 m-2 p-2 rounded-sm' type='text' placeholder='Course Title' onChange={(e) => { setTitle(e.target.value) }} id='' />
            <input className='border-2 m-2 p-2 rounded-sm' type='text' placeholder='Course Description' onChange={(e) => { setDec(e.target.value) }} id='' />
            <input className='border-2 m-2 p-2 rounded-sm' type='number' placeholder='Price in $' onChange={(e) => { setPrice(e.target.value) }} id='' />
            <input className='border-2 m-2 p-2 rounded-sm' type='number' placeholder='Course time' onChange={(e) => { setDuration(e.target.value) }} id='' />
            <input className='p-2 border-2 rounded-sm bg-slate-700 text-white' type='submit' onClick={submit} />
          </form>
        </div>
        <div>
          <div className='my-8 mx-28 shadow-2xl justify-center'>
            <h1 className='text-lg font-semibold'>Your courses</h1>
            <div>
            {fetch.map((item, index) => (
          <div className='flex' key={index}>
            <h1>{item.title}</h1>
            <h1>{item.dec}</h1>
            <h1>{item.price}</h1>
            <h1>{item.duration}</h1>
          </div>
        ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course