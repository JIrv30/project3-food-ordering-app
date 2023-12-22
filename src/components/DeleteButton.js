import { useState } from "react"

export default function DeleteButton ({label,onDelete}) {
  const [showConfirm, setShowConfirm] = useState(false)

  if(showConfirm) {
    return (
      <div className="fixed bg-black/75 inset-0 flex items-center h-full justify-center ">
        <div className="bg-white p-4 rounded-lg">
          <h3>Are you sure you want to delete?</h3>
          <div className="flex gap-2 mt-1">
            <button 
              type="button" 
              className=""
              onClick={()=>setShowConfirm(false)}>
              Cancel
            </button>

            <button 
              type="button" 
              className="primary "
              onClick={()=>{
                onDelete()
                setShowConfirm(false)}}>
              Yes,&nbsp;delete!
            </button>

          </div>
        </div>

      </div>
    )
  }

  
  return (
    <button
      
      onClick={()=>setShowConfirm(true)}
      >
      {label}
    </button>
  )
}