'use client'
import {useProfile} from '@/components/useProfile'
import { useState } from 'react'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'
import toast from 'react-hot-toast';
import Link from 'next/link'
import Left from '@/components/icons/Left'
import {redirect} from "next/navigation";

export default function NewMenuItemPage () {
  const {loading, data} = useProfile()

  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [redirectToItems, setRedirectToItems] = useState(false)

  

  async function handleFormSubmit (e) {
    e.preventDefault()
    const data = {image, name, description, basePrice}
    const savingPromise = new Promise (async(resolve, reject)=>{
      const response =  await fetch('/api/menu-items',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      })
      if(response.ok)
        resolve()
      else
        reject()
    })
    await toast.promise (savingPromise,{
      loading: 'saving this tasty item',
      success: 'Saved',
      error: 'Error'
    })
    setRedirectToItems(true)
  }
  if(redirectToItems){
    return redirect('/menu-items')
  }
  if(loading) {
    return 'Loading user info...'
  }

  if(!data.admin) {
    return 'Not an admin'
  }

  return(
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className='max-w-md mx-auto mt-8'>
        <Link href={'/menu-items'} className='button'>
          <Left />
          <span>Show all menu items</span>
          
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className='mt-8 max-w-md mx-auto'>
        <div className='grid gap-4 items-start' style={{gridTemplateColumns: '0.3fr 0.7fr'}}>
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className='grow'>
            <label>Item name</label>
            <input 
              type='text'
              value={name}
              onChange={e=>setName(e.target.value)}
              />
            <label>Description</label>
            <input 
              type='text' 
              value={description}
              onChange={e=>setDescription(e.target.value)}
              />
            <label>Base price</label>
            <input 
              type='text' 
              value={basePrice}
              onChange={e=>setBasePrice(e.target.value)}
              />
            <button type='submit' className='mb-2'>Create</button>
          </div>
          <div>
            
          </div>
        </div>

      </form>
    </section>
  )
}