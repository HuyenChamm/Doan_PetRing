import React from 'react'

export default function AlertLogin() {
  return (
    <div className='alert container'>
      <div className=' w-full h-550  flex items-center justify-center '>
        <div className='typing-container'>
          <h3 className='text'>Please log in to continue !</h3>
         
          <div className='flex'>
            <div className='flex items-center  justify-center m-5'>
              <a href='/Login' className="px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400   ">Login</a>
              <a href="/Register" className="px-4 py-1 rounded-r-sm bg-orange-400  text-white border-2 border-solid  border-orange-400   ">Signup</a>
            </div>
            <div className='text-slate-900 mt-6'>
              <a href="/Advertisement"> <p><strong>Go to Advertisement!</strong></p></a>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
