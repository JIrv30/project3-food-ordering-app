'use client'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from '@/components/useProfile'
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';


export default function CategoriesPage () {
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [editedcategory, setEditedCategory] = useState(null)
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

  async function handleCategorySubmit (e) {
    e.preventDefault()
    const creationPromise = new Promise(async(resolve, reject)=>{
      const data = {name:categoryName}
      if(editedcategory){
        data._id = editedcategory._id
      }
      const response = await fetch('/api/categories',{
        method: editedcategory ? 'PUT' : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      setCategoryName('')
      fetchCategories()
      setEditedCategory(null)
      if(response.ok) 
        resolve()
      else
        reject()
    })
    await toast.promise(creationPromise, {
      loading: editedcategory
       ? 'Updateding category...' 
       : 'Creating your new category...',
      success: editedcategory 
        ? 'category updated' 
        : 'category created',
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

      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedcategory ? 'Update category': 'New category name'}
              {editedcategory && (
              <>: <b>{editedcategory.name}</b></>
              )}
            </label>
            <input 
              type="text"
              value={categoryName}
              onChange={e=>setCategoryName(e.target.value)} />
          </div>

          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editedcategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
        
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories?.length && categories.map(c=>(
          <button 
            key={c._id} 
            className="rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1"
            onClick={()=>{
              setEditedCategory(c)
              setCategoryName(c.name)
              }}>
            <span>{c.name}</span>
          </button>
        )) }
      </div>
    </section>
  )
}