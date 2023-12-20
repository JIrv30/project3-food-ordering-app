'use client'
import { useState } from "react"
import EditableImage from '@/components/layout/EditableImage'
import MenuItemPriceProps from '@/components/layout/MenuItemPriceProps'


export default function MenuItemForm ({onSubmit, menuItem}) {
  const [image, setImage] = useState(menuItem?.image || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [description, setDescription] = useState(menuItem?.description || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [sizes, setSizes] = useState([])
  const [extraIngredientPrices, setExtraIngredientPrices] = useState([])
  
  

  return (
    <form 
    onSubmit={e=>onSubmit(e,{image, name, description,basePrice, sizes, extraIngredientPrices})} 
    className='mt-8 max-w-md mx-auto'>
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