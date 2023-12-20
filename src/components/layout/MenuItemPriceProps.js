
import Trash from '@/components/icons/Trash'
import Plus from '@/components/icons/Plus'

export default function MenuItemPriceProps ({name,addLabel,props, setProps}) {
  


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
              <label>{name}</label>
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
  )
}