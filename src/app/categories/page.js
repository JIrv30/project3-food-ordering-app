'use client'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from '@/components/useProfile'
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';


export default function CategoriesPage () {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const {loading:profileLoading, data:profiledata} = useProfile()
  

  useEffect(()=>{
    fetchCategories()
  },[])

  function fetchCategories () {
    fetch('/api/categories')
    .then(res=>res.json()
      .then(categories=>{
        setCategories(categories)
      })
    )
  }

  async function handleNewCategorySubmit (e) {
    e.preventDefault()
    const creationPromise = new Promise(async(resolve, reject)=>{
      const response = await fetch('/api/categories',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name:newCategoryName})
      })
      setNewCategoryName('')
      fetchCategories()
      if(response.ok) 
        resolve()
      else
        reject()
    })
    await toast.promise(creationPromise, {
      loading: 'Creating your new category...',
      success: 'category created',
      error: 'Error sorry...'
    })
  }

  if(profileLoading) {
  return 'Loading user info...'
  }

  if(!profiledata.admin) {
    return 'Not an admin'
  }

  
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />

      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>New categorey name</label>
            <input 
              type="text"
              value={newCategoryName}
              onChange={e=>setNewCategoryName(e.target.value)} />
          </div>

          <div className="pb-2">
            <button className="border border-primary" type="submit">Create</button>
          </div>
        </div>
        
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories?.length && categories.map(c=>(
          <button key={c._id} className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1">
            
            <span>{c.name}</span>
          </button>
        )) }
      </div>
    </section>
  )
}