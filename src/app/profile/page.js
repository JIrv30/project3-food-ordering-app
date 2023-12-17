'use client'
import { useSession } from "next-auth/react"
import {redirect} from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from "react"

import toast from 'react-hot-toast';

//to do - need to add error box - could refator success and info box to be more reusable

export default function ProfilePage () {
  const session = useSession()
  const [userName, setUserName] = useState('')
  const [image, setImage] = useState('')
  const {status} = session

  useEffect(()=>{
    if(status==='authenticated') {
      setUserName(session?.data?.user?.name)
      setImage(session.data.user.image)
    }
  },[session, status])
  
  const userImage = session?.data?.user?.image

  async function handleProfileInfoUpdate (e) {
    e.preventDefault()
    
    const savingPromise = new Promise (async(resolve, reject)=>{
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: userName,image})
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

  async function handleFileChange (e) {
    const files = e.target.files
    if(files?.length===1){
      const data = new FormData
      data.set('file', files[0])
      
      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(response=>{
        if(response.ok) {
          return response.json().then(link =>{
            setImage(link)
          })
        }
        throw new Error ('Something went wrong!')
      })

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        sucess: 'Upload complete',
        error: 'Upload error',
      })
    }
  }

  if(status === 'loading') {
    return 'Loading...'
  }

  if(status === 'unauthenticated') {
    return redirect('/login')
  }


  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Profile
      </h1>
      
      <div className="max-w-md mx-auto ">
        <div className="flex gap-4 items-center">
          <div>     
            <div className=" p-2 rounded-lg relative max-w-[120px]">
              {image && (<Image className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250} alt="avatar" />)}
              
              <label>
                <input className="hidden" type="file" onChange={handleFileChange} />
                <span className="border border-gray-300 rounded-lg p-2 block text-center cursor-pointer">Edit</span>
              </label>
              
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input 
            type="text" 
            placeholder="First and last name"
            value={userName}
            onChange={e=>setUserName(e.target.value)} />
            
            <input 
            type="email" 
            value={session.data.user.email}
            disabled={true} />
            
            <button type="submit">Save</button>
          </form>

        </div>
      </div>
    </section>
  )
}