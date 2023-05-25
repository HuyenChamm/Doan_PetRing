import React, { useEffect, useState } from 'react'
import apiGeneral from '../../../api/apiGeneral';


export default function HandleLike(props) {


  const [isLike, setIsLike] = useState()
  const { postId , handleCountLike} = props
  useEffect(() => {
    const str = document.cookie;
    const id = str.substring(3);

    apiGeneral({ url: `/api/like/status`, params: { postId, id } })
      .then(data => {
        setIsLike(data)
        
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const handleLike = (e) => {
    // if(isLike.status === true)
    const str = document.cookie;
    const id = str.substring(3);
    apiGeneral({ url: `/api/like`, params: { postId, id } ,method: isLike.status ? "delete" : "post" })
      .then(data => {
        setIsLike(data)
        handleCountLike(data.status)
        
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <button onClick={handleLike}
        className=''> <i className={`fa-solid fa-heart pr-2 ${isLike && isLike.status ? "text-red-600" : "text-slate-900"}`} />
      </button>
    </div>
  )
}
