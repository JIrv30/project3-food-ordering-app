import toast from 'react-hot-toast';
import Link from 'next/link'
import Image from 'next/image'

export default function EditableImage ({link, setLink}) {

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
            setLink(link)
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
  return (
    <>
      {link && 
      (<Image 
        className="rounded-lg w-full h-full mb-1" 
        src={link} 
        width={250} 
        height={250} 
        alt="avatar" />)}
        {!link && (
          <div className='bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center'>
            No Image
          </div>
        )}     
      <label>
        <input 
          className="hidden" 
          type="file" 
          onChange={handleFileChange} />
        <span className="border border-gray-300 rounded-lg p-2 block text-center cursor-pointer">
          Edit
        </span>
      </label>
    </>
    
  )
}