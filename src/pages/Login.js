import React from 'react'
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'

function Login() {
  return (
    <div>
        <Header />
        <div className='flex justify-center p-36 w-[100%]'>
            <LoginForm />
        </div>
        <div className='text-center'>
          <a href='/admin' className='bg-slate-700 hover:bg-slate-900 text-white p-2 px-16 '>Admin</a>
        </div>
    </div>
  )
}

export default Login