import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import { useNavigate } from 'react-router-dom';

export default function Zoo() {

  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    apiGeneral({ url: `/api/zoo` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  //
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // navigate to the previous page
  };
  return (
    <div>
      <div className='container my-10'>
        <div>
          <button onClick={goBack}><i className="fa-solid fa-arrow-left-long"></i></button>
        </div>
        <div className='text-center pb-4'><h2>ZOO <i className="fa-solid fa-paw"></i></h2></div>
        
        <div className='grid grid-cols-1 gap-y-8 md:grid-cols-2  lg:grid-cols-3'>
          {
            nodes.map((node) => (
              <div className='item relative' key={node.id}>
                <img src={"/images/" + node.p.img} className="w-90p rounded-md " alt="" />
                <div className='text-slate-900 absolute bottom-0 rounded-sm backdrop-blur-3xl   w-90p'>
                  <div className='text-center pt-2'><p className='font-semibold mb-2'>{node.p.name}</p></div>
                  <div className='text-xs mx-2'>
                    <p className='mb-2'>
                      Hello! My name is <span>{node.p.name}</span>. I'm a <span>{node.p.type}</span>. My weight is <span>{node.p.weight}</span>. Now, I'm <span>{node.p.age}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
