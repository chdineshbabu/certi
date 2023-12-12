import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [institue, setInstitue] = useState('')
  const [subject, setSubject] = useState('')
  const [position, setPosition] = useState('')
  const [number, setNumber] = useState('')
  const [password,setPassword] = useState('')


  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register", {
        name, email, institue, subject, position, number,password
      }).then(res => {
        if (res.data === 'ok') {
          navigate("/")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='m-16 shadow-2xl shadow-black justify-center text-center p-16 w-[35%]'>
      <h1 className='text-xl font-semibold'>Register Here</h1>
      <div>
        <form className='flex flex-col gap-3 p-4 ' action='POST'>
          <input className='p-2 border-2' type='text' onChange={(e) => { setName(e.target.value) }} placeholder='Enter your name' id='' />
          <input className='p-2 border-2' type='Email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your Email' id='' />
          <input className='p-2 border-2' type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Set password' id='' />
          <input className='p-2 border-2' type='text' onChange={(e) => { setInstitue(e.target.value) }} placeholder='Enter your Institue name' id='' />
          <input className='p-2 border-2' type='text' onChange={(e) => { setSubject(e.target.value) }} placeholder='Enter your subject' id='' />
          <input className='p-2 border-2' type='text' onChange={(e) => { setPosition(e.target.value) }} placeholder='Enter your Position' id='' />
          <input className='p-2 border-2' type='number' onChange={(e) => { setNumber(e.target.value) }} placeholder='+91' id='' />
          <input type='submit' onClick={submit} />
        </form>
      </div>
    </div>
  )
}

export default Signup