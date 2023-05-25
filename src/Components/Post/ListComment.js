import React, { useEffect, useState } from 'react';
import apiGeneral from '../../api/apiGeneral';

export default function ListComment(props) {
  const [nodes, setNodes] = useState([]);
  const  params = { post_id : props.postId };
  const { postId,socket} = props;
  
  useEffect(() => {
    apiGeneral({ url: `/api/comment`, params})
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
     
      socket.on("addcomment",(data) => {
        // console.log(data.idp,postId);

        if ( +postId === data.idp) {
          setNodes(oldData => [...oldData,data]);
        }
      })
  }, [props.postId])


  return (
    <div>
      {
        nodes.sort((a,b)=> b.idcmt-a.idcmt ).map((node) => (
          <div className='w-4/5 mx-auto  mt-10' key={node.idcmt}>
            <div className='flex'>
              <img src={"/images/" + node.u.avt} className="w-14 h-14 border-slate-600 border-solid border-2 rounded-full" alt="" />

              <div className='p-2 ml-5  border-solid border-2 border-slate-600 rounded-xl '>
                <div className='font-bold text-sm'>
                  <p className='mb-4' >{node.u.name}</p>
                </div>

                <div className='border-solid border-t-2 border-slate-600'></div>

                <div className='content-cmt text-sm pt-3 text-black'>
                  <p >{node.cmt.content}</p>
                </div>
                <div className='text-sm flex text-black'>
                  <div className='flex'>
                    <i className="fa-solid fa-heart pr-2 text-slate-900"></i>
                    <p className='mb-0'>Like</p>
                  </div>
                  <div className='pl-5 flex text-black'>
                    <i className="fa-solid fa-trash pr-2 text-slate-900"></i>
                    <p className='mb-0'>Delete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
