'use client'
import { useSession } from "next-auth/react"
import {redirect} from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from "react"
import Link from 'next/link'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'

import toast from 'react-hot-toast';


export default function ProfilePage () {
  const session = useSession()
  const [userName, setUserName] = useState('')
  const [image, setImage] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileFetched, setProfileFetched] = useState(false)
  const {status} = session

  
  useEffect(()=>{
    if(status==='authenticated') {
      setUserName(session.data.user.name)
      setImage(session.data.user.image)
      fetch('/api/profile').then(response =>{
        response.json().then(data=>{
          setPhone(data.phone)
          setStreetAddress(data.streetAddress)
          setPostalCode(data.postalCode)
          setCity(data.city)
          setCountry(data.country)
          setIsAdmin(data.admin)
          setProfileFetched(true)
        })
      })
    }
  },[session, status])
  

  async function handleProfileInfoUpdate (e) {
    e.preventDefault()
    
    const savingPromise = new Promise (async(resolve, reject)=>{
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: userName,
          image,
          streetAddress,
          phone,
          postalCode,
          city,
          country
        })
      })
      if(response.ok) 
        resolve()
      else
        reject()
    })
    await toast.promise(savingPromise, {
      loading: 'Loading...',
      success: 'Profile saved!',
      error: 'Error',
    })
  }

  if(status === 'loading' || !profileFetched) {
    return 'Loading...'
  }

  if(status === 'unauthenticated') {
    return redirect('/login')
  }


  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <div className="flex gap-4">
          <div>     
            <div className=" p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={image} setLink={setImage}  />
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input 
              type="text" 
              placeholder="First and last name"
              value={userName}
              onChange={e=>setUserName(e.target.value)} />
            
            <label>email</label>
            <input 
              type="email"
              placeholder="email" 
              value={session.data.user.email || ''}
              disabled={true} />
            
            <label>Phone</label>
            <input
             type="tel" 
             placeholder="Phone Number"
             value={phone}
             onChange={e=>setPhone(e.target.value)}  />
            
            <label>Street Address</label>
            <input 
              type="text" 
              placeholder="Street address"
              value={streetAddress}
             onChange={e=>setStreetAddress(e.target.value)}   />

            <div className="flex gap-2">
              <div>
                <label>Postal Code</label>
                <input
                  type="text" 
                  placeholder="Post code"
                  value={postalCode}
                  onChange={e=>setPostalCode(e.target.value)}   />  
              </div>
              
              <div>
                <label>city</label>
                <input
                  type="text"
                  placeholder="city"
                  value={city}
                  onChange={e=>setCity(e.target.value)}   />
              </div>
              

            </div>
            <label>Country</label>
            <input 
              type="text" 
              placeholder="Country"
              value={country}
              onChange={e=>setCountry(e.target.value)}   />
            
            <button type="submit">Save</button>
          </form>

        </div>
      </div>
    </section>
  )
}