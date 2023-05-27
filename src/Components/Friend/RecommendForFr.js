import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';


export default function RecommendForFr() {

  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    // const str = document.cookie;
    // const id = str.substring(3);
    // apiGeneral({ url:`/api/recommendfr` , params: {id}})
    // .then(data => {
    //   setNodes (data.data);
    // })
    // .catch(error =>{
    //   console.log(error);
    // })
  },[])
  return (
    <div className='recommend text-slate-900'>
    
      <div className='container py-10 '>
        <h5 className='text-center'>List mutual friends </h5>
        <div className='w-full md:w-3/4 mx-auto '>

        {
        nodes.map((node) => (
          <div className='item py-3' key={node.id}>
            <div className='flex justify-around '>
              <div className='flex relative'>
                <div>
                  <img src={"/images/" + node.u.avt} className="w-16 h-16 rounded-full border-2 border-solid border-slate-900" alt="" />
                </div>
                <div className='pl-4 mt-2'>
                  <p className='mb-3 font-bold'>{node.u.name}</p>
                  <p className='text-sm'>{node.count} Mutual Friends</p>
                </div>
                <div className='absolute flex -right-14 bottom-6'>
                  <img src={"/images/" + node.fr.avt} className="w-8 h-8 rounded-md" alt="" />
                </div>
              </div>
              <div className='mt-2 pb-2 text-center'>
                <button className='px-6 py-2 text-sm font-bold border-2 border-solid border-slate-900'>
                  + <span className='hidden  md:inline-block'> ADD FRIEND</span>
                </button>
              </div>
            </div>
            <div className='border-b-2 border-solid border-slate-400 w-full md:w-3/5 mx-auto'></div>
          </div>
        ))}

        </div>
      </div>
    </div>
  )
}
