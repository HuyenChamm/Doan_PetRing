import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';

export default function CheckLogin(props) {

  const { isLoggedIn, handleLogout } = props
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);
   

    apiGeneral({ url: `/api/user/${params}` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      {
        isLoggedIn ?

          <div className='text-white pl-5'>
            {
              nodes.map((node) => (
                <small className='pr-3' key={node.id}><i className="fa-regular fa-user"></i> {node.n.name} !</small>
              ))}
            <button type='button' onClick={handleLogout}
              className='px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400 '>Logout
              <i className="fa-solid fa-arrow-right-from-bracket pl-2"></i></button>

          </div>


          :
          <div className='flex items-center justify-center m-5 '>
            <a href='/Login' role='button'
              className="px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400">
              Login
            </a>
            <a href="/Register" className="px-4 py-1 rounded-r-sm bg-orange-400  border-2 border-solid  border-orange-400    text-white ">Signup</a>
          </div>
      }

    </div>
  )
}
