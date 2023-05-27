import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import Swal from 'sweetalert2';

export default function ListAccept() {

  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    const str = document.cookie;
    const id = str.substring(3);
    console.log("idaccept",id);
    apiGeneral({ url: `/api/accept`, params: { id } })
      .then(data => {
        setNodes(data.data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const handleAccept = (e)=>{
    const idadd = e.target.id;
    console.log(idadd);

    const str = document.cookie;
    const idu = str.substring(3);
   
    apiGeneral({ url: `/api/accept`, params: { idadd ,idu }, method:"POST" })
      .then(data => {
        setNodes(data.data);
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Accept friend request success',
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(function () {
          window.location.href = "/ListFriend";
        }, 5000);
      })
      .catch(error => {
        console.log(error);
      })
  }
  return (
    <div className='recommend text-slate-900'>
      <div>
        <div className='container py-10 '>
          <h5 className='text-center'>Friend Request </h5>
          <div className='border-b-2 border-solid border-slate-900 w-1/4 mx-auto  -mt-3 '></div>
          <div className='border-b-2 border-solid border-slate-900 w-1/4 mx-auto mb-10 -mt-1 '></div>
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
                        <p className='mb-1 font-bold'>{node.u.name}</p>
                        <p className=' text-slate-500'>{node.u.address}</p>
                      </div>
                    </div>
                    <div className='mt-2 pb-2 text-center'>
                      <button onClick={handleAccept}
                      className='px-6 py-2 text-sm font-bold border-2 border-solid border-slate-900' id={node.id}>
                        + <span className='hidden  md:inline-block' id={node.id}> ACCEPT </span>
                      </button>
                    </div>
                  </div>
                  <div className='border-b-2 border-solid border-slate-400 w-full md:w-3/5 mx-auto'></div>
                </div>
              ))}

          </div>
        </div>
      </div>
    </div>
  )
}
