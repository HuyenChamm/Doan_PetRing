import React, { useEffect, useState } from 'react'
import apiGeneral from '../../../api/apiGeneral';
import HandleLike from './HandleLike';


export default function Like(props) {
  const [nodes, setNodes] = useState([]);
  const { postId } = props


  useEffect(() => {
    apiGeneral({ url: `/api/like`, params: { postId } })
      .then(data => {
        setNodes(data.data.length ? data.data[0] : 0);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
    //

  }, [])

  const handleCountLike = (status) => {
    setNodes(status ? nodes + 1 : nodes - 1)
  }

  return (
    <div className='flex'>
      <HandleLike postId={postId} handleCountLike = {handleCountLike}/>
      <div className='pr-3 pb-3 text-black flex'>
        {


          <p >{nodes} Likes </p>

        }
      </div>
    </div>
  )
}
