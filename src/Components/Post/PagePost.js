import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';

export default function PagePost(props) {
  const [nodes, setNodes] = useState([]);

  const { id } = props;

  useEffect(() => {

    apiGeneral({ url: `/api/personalpost/${id}` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
 

  return (
    <div className='container text-slate-900'>
      {
        nodes.map((node) => (
          <div className='py-10' key={node.idp}>
            <div className='shadow-sm py-10 pl-2 rounded-2xl  shadow-slate-900 bg-white'>
              <div className='flex pl-3'>
                <div>
                  <img src={"/images/" + node.u.avt} className="w-9 h-9 md:w-14 md:h-14 border-slate-900 border-solid border-2 rounded-full" alt="" />
                </div>
                <div className='flex justify-between w-11/12'>
                  <div className='pl-4'>
                    <div className='md:flex w-full'>
                      <p className='font-bold text-sm mb-0 md:mb-7'>{node.u.name}</p>
                      <p className='md:pl-3 text-sm text-black'>{node.post.datetime}</p>
                    </div>
                    <div className='-mt-6 w-20 h-5 text-center bg-gray-50 border border-slate-900 text-gray-900 text-xs rounded-full blockpx-2.5'>
                      <p className='mb-0 capitalize' >{node.post.post_setting}</p>
                    </div>
                  </div>

                
                </div>

              </div>

              <div className='w-4/5 m-auto py-10 text-black'>
                <p >
                  {node.post.content}
                </p>
                <img src={"/images/" + node.post.img} className="mx-auto w-48 md:w-96 " alt="" />
              </div>

             
            </div>
          </div>

        ))}
    </div>
  )
}
