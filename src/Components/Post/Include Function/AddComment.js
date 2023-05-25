import React, {  useState } from 'react'
import apiGeneral from '../../../api/apiGeneral';

export default function AddComment(props) {
  const { isLoggedIn, postId } = props

  const [content, setContent] = useState('');
  // console.log(postId);

  const handleComment = (e) => {
    const str = document.cookie;
    const id = str.substring(3); 
    e.preventDefault();
    apiGeneral({ url:`/api/comment/addComment`, params:{ postId ,id ,content } , method:"post" })
    .catch(error =>{
      console.log(error);
    });
    
    setContent('');
    
    // console.log(postId ,id ,content);
  }


  return (
    <div>
      {
        isLoggedIn ?
          <form className='w-4/5 m-auto md:flex justify-between mt-10  ' onSubmit={handleComment}>
            <div className='flex w-full  md:w-4/5'>
              <textarea type='text' value={content} onChange={(event) => setContent(event.target.value)} 
                placeholder='User name, bạn đang nghĩ gì thế ?' 
                className="resize-y rounded-md border-solid border-2 border-slate-900 px-2 w-full">
              </textarea>
            </div>
            <div className='mt-3 md:mt-0'>
              <button type="submit"
              className="text-white bg-slate-900 border-solid  border-2 hover:bg-slate-900 font-medium rounded-full text-sm  px-5 py-1 text-center">Comment</button>
            </div>
          </form>
          :
          <div></div>
      }
    </div>
  )
}
