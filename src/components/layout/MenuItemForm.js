'use client'
import { useEffect, useState } from "react"
import EditableImage from '@/components/layout/EditableImage'
import MenuItemPriceProps from '@/components/layout/MenuItemPriceProps'


export default function MenuItemForm ({onSubmit, menuItem}) {
  const [image, setImage] = useState(menuItem?.image || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [description, setDescription] = useState(menuItem?.description || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [sizes, setSizes] = useState(menuItem?.sizes || [])
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || [])
  const [category, setcategory] = useState(menuItem?.category || '')
  const [categories, setCategories] = useState([])
  
  useEffect(()=>{
    fetch('/api/categories')
    .then(res=>{
      res.json()
      .then(categories=>{
        setCategories(categories)
      })
    })
  },[])
  

  return (
    <form 
    onSubmit={e=>onSubmit(e,{image, name, description,basePrice, sizes, extraIngredientPrices, category})} 
    className='mt-8 max-w-2xl mx-auto'>
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
            
            <label>Category</label>
              <select 
                value={category} 
                onChange={e=>setcategory(e.target.value)}
                >
                {categories?.length>0 && categories.map(c=>(
                  <option 
                    key={c._id} 
                    value={c._id}
                    >
                    {c.name}
                  </option>
                ))}
              </select>
            
            <label>Base price</label>
            <input 
              type='text' 
              value={basePrice}
              onChange={e=>setBasePrice(e.target.value)}
              />
            
            <MenuItemPriceProps 
              name={'Sizes'}
              addLabel={'add Item size'} 
              props={sizes} 
              setProps={setSizes} 
            />

            <MenuItemPriceProps
              name={'Extra ingredients'}
              addLabel={'Add ingredients prices'}
              props={extraIngredientPrices}
              setProps={setExtraIngredientPrices}
            />
            
            <button type='submit' className='mb-2'>Save</button>
          </div>
          <div>
            
          </div>
        </div>

      </form>
  )
}