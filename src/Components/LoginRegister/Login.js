import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import apiGeneral from '../../api/apiGeneral';

export default function Login(props) {

  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');


  
  function handleLogin(e) {
    e.preventDefault();
    apiGeneral({ url: '/api/user/login', params: { username, pass } })
      .then(data => {
        if (data.status === 'success')
          {
           
            document.cookie = `id=${data.data[0].id}`; 
            window.location.href = "/"
            // document.cookie = `id=${data.id}`; window.location.href = "/"
          } 
        else {
          Swal.fire({
            icon: 'error',
            text: "Incorrect password or username !",
          })
        }
      })
      .catch(error => Swal.fire({
        icon: 'error',
        text: error,
      }))
  }
  return (
    <div className='login h-664 w-full text-slate-900'>
      <div className='container'>
        <div className='py-40  m-auto max-w-xs md:max-w-lg '>
          <div className='border-solid border-2 p-14 border-white backdrop-blur-3xl rounded-2xl'>
            <div className='text-center text-white'>
              <h3>Login</h3>
            </div>

            <form onSubmit={handleLogin}>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required
                  value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="password" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required
                  value={pass} onChange={e => setPass(e.target.value)} />
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>
              <div className='text-center'>
                <button type="submit" className="text-white bg-slate-900 border-solid  border-2 hover:bg-sky-900 font-medium rounded-full text-sm  sm:w-auto px-20 py-2 my-5 text-center">Login</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
