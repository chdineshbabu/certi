import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/login", {
        email,password
      }).then(res => {
        if (res.data === 'notexist') {
          alert('Please Register first');
          navigate('/register')
         } else if (res.data === 'incorrect') {
          alert("Incorrect password")
          navigate(0)
          } else {
           navigate("/dash/"+res.data)
          }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[27%]'>
      <form className='flex  flex-col gap-3 p-4 ' action='POST'>
        <input className=' p-2 border-2' type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your Email' id='' />
        <input className='p-2 border-2' type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' id='' />
         <input className='bg-slate-700 hover:bg-slate-900 text-white p-2 border-gray-200' type='submit' onClick={submit} />
      </form>
    </div>
  )
}

export default LoginForm