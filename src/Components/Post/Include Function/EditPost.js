import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import apiGeneral from '../../../api/apiGeneral';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditPost() {
  const [content, setContent] = useState('');
  const [option, setOption] = useState('');
  const [img, setImg] = useState('');
  const [nodes, setNodes] = useState([]);
  let { id } = useParams();


  //
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // navigate to the previous page
  };
 ////

  useEffect(() => {

    apiGeneral({ url: `/api/personalpost/pagepost/${id}` })
      .then(data => {
        setNodes(data.data);
        console.log("post",data.data);
        const post = data.data[0].post
        console.log("PPPPPPPPP",post);
        setContent(post.content)
        setOption(post.post_setting)
        setImg(post.img)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  

  const handleEdit = async (event) => {
    // const idp = event.target.id;
    // console.log(id, "idddđ", idp, "a");
    const str = document.cookie;
    const ID = str.substring(3);
    apiGeneral({ url: `/api/personalpost`, params: { id,content,option,img }, method: "put" })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Edit post success',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(function () {
        window.location.href =  `/Page/${ID}`;
      }, 5000);

    })
    .catch(error => console.error(error));
  }
  return (
    <div className='container py-10'>
    
      <div>
      
      <button onClick={goBack}><i className="fa-solid fa-arrow-left-long"></i></button>
      
        <div>
          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
          <textarea type="text" value={content} onChange={(event) => setContent(event.target.value)}
            name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
        </div>
        <div className='mt-3'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
          <input type="file" accept=".jpg, .jpeg, .png, .gif"  onChange={(event) => setImg(event.target.value)}
            name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
        </div>

        <div className='mt-3'>
          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Setting </label>
          <select value={option} onChange={(event) => setOption(event.target.value)}
            className="bg-gray-50 border border-slate-600 text-gray-900 text-xs rounded-full block w-full px-2.5">
            <option value="public"  >Public</option>
            <option value="private">Private</option>
          </select>
        </div>



        <div className='mt-3 text-end'>
          <button onClick={handleEdit}
            className="text-white bg-slate-900 font-medium rounded-full text-sm   px-5 py-1 text-center">Save</button>
        </div>
       
      </div>
    
    </div>
  )
}
