import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';
import RecommendForPet from './RecommendForPet';
import RecommendForFr from './RecommendForFr';
import { Link } from 'react-router-dom';

export default function Recommend(props) {
  const {isLoggedIn} = props
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    const str = document.cookie;
    const id = str.substring(3);
    apiGeneral({ url:`/api/recommend` , params: {id} })
    .then(data => {
      setNodes (data.data);
      console.log(data);
    })
    .catch(error =>{
      console.log(error);
    })
   console.log(id,"rec");
  },[])

  ///function Addfr
  const handleAddfr = (e) => {
    const str = document.cookie;
    const idadd = str.substring(3);
    const id = e.target.id;
    apiGeneral({ url:`/api/recommend` , params: {id , idadd} ,method:"post"})
    .then(data => {
      alert("OK")
      setNodes (data.data);
      console.log(data);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  return (
    <div className='recommend text-slate-900'>
    {
      isLoggedIn ? 
     <div>
     <div className='container py-10 '>
        <h5 className='text-center'>Recommend friends for you </h5>
        <div className='w-full md:w-3/4 mx-auto'>

        {
        nodes.map((node) => (
          <div className='item py-3' key={node.id}>
            <div className='flex justify-around '>
              <div className='flex'>
                <div>
                  <img src={"/images/" + node.u.avt} className="w-16 h-16 rounded-full border-2 border-solid border-slate-900" alt="" />
                </div>
                <div className='pl-4 mt-2'>
                  <Link to={`/PersonalPage/${node.id}`} className='font-bold' > {node.u.name} </Link>
                  {/* <p className='mb-1 font-bold'>{node.u.name}</p> */}
                  <p className=' text-slate-500'>{node.u.address}</p>
                </div>
              </div>
              <div className='mt-2 pb-2 text-center'>
                <button onClick={handleAddfr}
                className='px-6 py-2 text-sm font-bold border-2 border-solid border-slate-900' id={node.id}>
                  + <span className='hidden  md:inline-block' id={node.id}> ADD FRIEND</span>
                </button>
                
              </div>
            </div>
            <div className='border-b-2 border-solid border-slate-400 w-full md:w-3/5 mx-auto'></div>
          </div>
        ))}

        </div>
      </div>
      {/* <RecommendForPet/> */}
      {/* <RecommendForFr/> */}
     </div>
      
      :
      <AlertLogin/>
    }
    </div>
  )
}
