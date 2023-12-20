'use client'
import {useProfile} from '@/components/useProfile'
import { useEffect, useState } from 'react'
import UserTabs from '@/components/layout/UserTabs'
import toast from 'react-hot-toast';
import Link from 'next/link'
import Left from '@/components/icons/Left'
import {redirect, useParams} from "next/navigation";
import MenuItemForm from '@/components/layout/MenuItemForm'

export default function EditMenuItemPage () {
  const {loading, data} = useProfile()
  const {id} = useParams()
  const [menuItem, setMenuItem] = useState(null)
  const [redirectToItems, setRedirectToItems] = useState(false)

  useEffect(()=>{
    fetch('/api/menu-items')
    .then(res=>res.json().then(items=>{
      const item = items.find(i=> i._id===id)
      setMenuItem(item)
    }))
    
    
  },[])

  async function handleFormSubmit (e, data) {
    e.preventDefault()
    data = {...data, _id:id}
    const savingPromise = new Promise (async(resolve, reject)=>{
      const response =  await fetch('/api/menu-items',{
        method: 'PUT',
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
      <MenuItemForm
        menuItem={menuItem}
        onSubmit={handleFormSubmit} />
    </section>
  )
}