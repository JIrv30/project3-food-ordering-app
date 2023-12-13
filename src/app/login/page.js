'use client'
import { useState } from "react"
import Image from 'next/image'
import {signIn} from 'next-auth/react'


export default function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginInProgress, setLoginInProgress] = useState(false)

  async function handleFormSubmit (e) {
    e.preventDefault()
    setLoginInProgress(true)
    
    await signIn('credentials', {email, password, callbackUrl: '/'})

    setLoginInProgress(false)
  }

  return (
  <section className="mt-8">
    <h1 className="text-center text-primary text-4xl mb-4">
      Login
    </h1>

    <form 
      className="max-w-xs mx-auto" 
      onSubmit={handleFormSubmit}
      >
    <input 
          type="email"
          name="email"
          placeholder="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          disabled={loginInProgress}
          />

        <input 
          type="password"
          name="password" 
          placeholder="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button disabled={loginInProgress} type="submit">Login</button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>

        
        
    </form>

    <div className="max-w-xs mx-auto">
    <button 
            className='flex gap-4 justify-center'
            onClick={()=>signIn('google',{callbackUrl: '/'})}
            >
            <Image src={'/googleicon.png'} alt='login with google' width={24} height={24} />
            Login with Google
      </button>
    </div>
    
  </section>
)
}