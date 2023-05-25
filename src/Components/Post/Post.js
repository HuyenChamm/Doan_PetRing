import React, { useEffect, useState } from 'react';
import apiGeneral from '../../api/apiGeneral';
import ListComment from './ListComment';
import Like from './Include Function/Like';
import AddComment from './Include Function/AddComment';
import HandleLike from './Include Function/HandleLike';


export default function Post(props) {
  const [nodes, setNodes] = useState([]);
  const { isLoggedIn, socket } = props
  // const bien1 = props.isLoggedIn

  useEffect(() => {
    const params = isLoggedIn ? {} : { post_setting: 'public' };

    apiGeneral({ url: '/api/post', params })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
    socket.on("addpost", (data) => {
      setNodes(oldData => [...oldData, data]);
    })
  }, [isLoggedIn])

  // console.log("Aaaaa",nodes);

  return (
    <div className='container text-slate-900'>
      {
        nodes.sort((a, b) => a.idp - b.idp).map((node) => (
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
                  <div className='pr-3'>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>

              </div>

              <div className='w-4/5 m-auto py-10 text-black'>
                <p >
                  {node.post.content}
                </p>
                <img src={"/images/" + node.post.img} className="mx-auto w-48 md:w-96 " alt="" />
              </div>

              <div className='w-4/5 m-auto flex'>

              

                <Like postId={node.idp} />
              </div>
              <div className='w-4/5 m-auto border-solid border-t-2 border-slate-900'></div>
              {/* Add Comment */}

              <AddComment postId={node.idp} isLoggedIn={isLoggedIn} />

              <ListComment postId={node.idp} socket={socket} />
            </div>
          </div>

        ))}
    </div>
  )
}
