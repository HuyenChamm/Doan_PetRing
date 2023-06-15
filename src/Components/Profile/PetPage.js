import React from 'react'
import AlertLogin from '../AlertLogin'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import apiGeneral from '../../api/apiGeneral';

export default function PetPage(props) {
  const { isLoggedIn } = props
  const [nodes, setNodes] = useState([]);
  let { id } = useParams();
  console.log(useParams(),"useparamaaa");
  //
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // navigate to the previous page
  };
 ////
  useEffect(() => {
    apiGeneral({ url: `/api/petpage/${id}` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
    <div>
      {
        isLoggedIn ?
          <div className='profilepet bg-slate-900 text-white'>
          <div className='container pt-3'>
          <button onClick={goBack}><i className="fa-solid fa-arrow-left-long"></i></button>
        </div>
            {
              nodes.map(
                (node) => (
                <div className='container pt-24 md:pt-32 pb-4' >
                  <div className='py-4 bg-slate-800 rounded-md'>
                    <img src={"/images/" + node.n.img} className='w-24 h-24 md:w-32 md:h-32 rounded-full ml-10 -mt-16 border-solid border-4 border-white' alt="" />
                    <div className='block md:flex justify-between px-12'>

                      <div className=' pt-5'>
                        <div>
                          <h4>{node.n.name}</h4>
                          <p>{node.n.desc}</p>
                        </div>
                        <div className=''>
                          <button type="submit" className='px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400'>Follow <i className="fa-solid fa-plus"></i>
                          </button>
                          <Link  to={`/EditPet/${node.id}`} 
                            className='px-4 py-1  ml-3 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400'>Edit Information
                          </Link> 
                           
                        </div>
                      </div>

                      <div className='flex pt-5 md:block'>
                        <div className='hover:bg-slate-900 px-2 md:px-10 py-3'>
                          <p className='mb-0'>0 Follower</p>
                        </div>
                        <div className='hover:bg-slate-900 px-2 md:px-10 py-3'>
                          <p className='mb-0'>10 Like</p>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className='bg-slate-800 border-solid border-2 border-slate-900 mt-5 py-8 rounded-md px-8 md:px-12 '>
                    <div className='flex'>
                      <img src={"/images/" + node.n.img} className='w-16 h-16 mb-5 rounded-full' alt="" />
                      <div className='pl-8 font-bold pt-5'><p>{node.n.name}</p></div>
                    </div>
                    <div className='text-sm md:text-base'>
                      <p>
                        Hello! My name is <span>{node.n.name}</span>. I'm a <span>{node.n.type}</span>. My weight is <span>{node.n.weight}</span>. Now, I'm <span>{node.n.age}</span>
                      </p>
                    </div>


                    <div className='bg-slate-900 py-16 rounded-md'>
                      <img src="/images/bgprofilepet.png" className='m-auto' alt="" />
                      <img src={"/images/" + node.n.img} className='w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto -mt-32 hover:scale-125 transition duration-300 ease-in-out ' alt="" />
                      <div className='text-center  pt-10 md:text-h5'>
                        <p><strong> Welcome {node.n.name} !</strong></p>
                      </div>
                    </div>
                  </div>

               
                </div>
              ))}
          </div>
          :
          <AlertLogin />
      }
    </div>
    </div>
  )
}
