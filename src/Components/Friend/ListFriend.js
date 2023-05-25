import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';

export default function ListFriend(props) {
  const { isLoggedIn } = props
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);
    console.log("params", params);

    apiGeneral({ url: `/api/friend/${params}` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div className='list-friend py-10 text-slate-900 bg-slate-200'>
      {
        isLoggedIn ?

          <div className='container'>


            <div>
              <div className='text-center pb-4'><h5>List Friend</h5></div>
              <div className='border-b-2 border-solid border-slate-900 w-1/4 mx-auto  -mt-3 '></div>
              <div className='border-b-2 border-solid border-slate-900 w-1/4 mx-auto mb-10 -mt-1 '></div>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {
                  nodes.map((node) => (
                    <div className='item'>
                      <img src={"/images/" + node.avt} className="mx-auto w-32 h-32 md:w-48 md:h-48 rounded-md " alt="" />
                      <div className='text-center pt-3'><p className='font-semibold'>{node.name}</p></div>
                    </div>

                  ))}
              </div>
            </div>

          </div>
          :
          <AlertLogin />
      }
    </div>
  )
}
