
import ChevronUp from '@/components/icons/ChevronUp'
import ChevronDown from '@/components/icons/ChevronDown'
import Trash from '@/components/icons/Trash'
import Plus from '@/components/icons/Plus'
import { useState } from 'react'


export default function MenuItemPriceProps ({name,addLabel,props, setProps}) {
  const [isOpen, setIsOpen] = useState(false)


  function addProp () {
    setProps(oldProps=>{
      return (
        [...oldProps, {name:'', price: 0}]
      )
    })
  }

  function editProp (e,index,prop) {
    const newValue = e.target.value
    setProps(prevSizes=>{
      const newSizes = [...prevSizes]
      newSizes[index][prop] = newValue
      return newSizes
    })
  }

  function removeProp (indexToRemove) {
    setProps(prevSizes=>prevSizes.filter((val,index)=>index !== indexToRemove))
  }
  
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button 
        type='button'
        className='inline-flex p-1 bg-white border-0 justify-start'
        onClick={()=>setIsOpen(prev=>!prev)}>
        {isOpen &&(
          <ChevronUp />
        )}
        {!isOpen && (
          <ChevronDown />
        )}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length>0 && props.map((size,index) => (
          <div key={index} className="flex gap-2 items-end">
            <div>
              <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={e=>editProp(e,index, 'name')}
                />
            </div> 
            
            <div>
              <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={e=>editProp(e,index, 'price')}
                />
            </div>
            
            <div>
              <button 
                type="button" 
                onClick={()=>removeProp(index)}
                className="bg-white mb-2 px-2"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      
      <button
        className="bg-white items-center"
        type="button"
        onClick={addProp}
        >
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
      </button>
      </div>
      
    </div>
  )
}