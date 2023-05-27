import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';

export default function Chat(props) {
  const { isLoggedIn } = props;

  const [friends, setFriends] = useState([]);
  const [sends, setSend] = useState([]);

///////////
  useEffect(() => {
    apiGeneral({ url: '/api/chat/send' })
      .then(data => {
        setSend(data.data);
      })
      .catch(error => {
        console.log(error);
      })

    ///////
    const str = document.cookie;
    const params = str.substring(3);
    console.log("params", params);

    apiGeneral({ url: `/api/friend/${params}` })
      .then(data => {
        setFriends(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])



  return (
    <div className='chat bg-slate-100   text-slate-900'>
      {
        isLoggedIn ?
          <div>
            <div className='py-16 container flex '>
              <div className='left w-30p  border border-solid  border-slate-400 p-3 rounded-md'>
                <div>
                  <div className='flex mb-5'>
                    <div className='w-30p'>
                      <img src="/images/avt_1.jpg" className="mx-auto ml-0 w-16 h-16 shadow-md rounded-full shadow-slate-400" alt="" />
                    </div>
                    <div className='flex items-center mr-12 w-70p'><p className='mb-0'><strong> User Name </strong> </p></div>
                  </div>
                  <div className='border border-solid  border-slate-500 my-3'></div>

                  <div className='flex   border border-solid  border-slate-400 p-3 rounded-md'>
                    <div >
                      <img src="/images/avt_1.jpg" className="mx-auto ml-0 mr-14 w-12 h-12  shadow-md rounded-full shadow-slate-400" alt="" />
                    </div>
                    <div className=''>
                      <p className='mb-2'><strong>User name</strong></p>
                      <div className='text-xs'>
                        <p className='mb-0'>
                          Content Message Content Message Content Message Content Message
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>


              <div className='boxchat w-60p px-4 '>

                <div className='mx-auto bg-gray-400 rounded-md h-550 md:h-664'>
                  <div className='py-5 px-3 flex'>
                    <img src="/images/pet_7.jpg" className='w-16 h-16 rounded-full' alt="img" />
                    <div className='pl-3 pt-5 font-bold '>
                      <p>User Name</p>
                    </div>
                  </div>
                  <div className='message-content px-5 h-73p md:h-3/4 '>
                    {sends.map((send) => (
                      <div className='user-left py-3 flex justify-start'>

                        <div className='bg-slate-200 w-60p lg:w-2/5 px-3 pt-1 pb-3 rounded-xl text-sm md:text-base'>
                          <small className='text-xs text-slate-800'>{send.u.name}</small>
                          <p className='mb-0 '>{send.m.message}</p>
                        </div>
                      </div>
                    ))}

                    {/* {
              receives.map((receive) => (
              <div className='user-right py-3 flex justify-end'>
                <div className='bg-slate-200 w-60p lg:w-2/5 p-3 rounded-full text-sm md:text-base'>
                  <p className='mb-0'>{receive.m.message}</p>
                </div>
              </div>
              ))} */}
                  </div>

                  <div className='flex-col pb-5 mx-auto '>
                    <input type="text" name="" id="" className='w-4/6 md:w-10/12 lg:w-11/12 ml-3 rounded-lg' />
                    <i className="fa-solid fa-paper-plane pl-3"></i>
                  </div>
                </div>

              </div>
{/* Friend */}
              <div className='right w-20p border border-solid  border-slate-400 p-3 rounded-md '>
                <div>
                  <div className="flex">

                    <button> <i className="text-slate-500 fa-solid fa-magnifying-glass text-xs pr-2"></i></button>

                    <input type="text" className=" text-xs border border-solid  hover:border-slate-200 " placeholder="  Search " />
                  </div>
                </div>
                <div className='mt-3'>
                  <p><strong>List Friend</strong></p>
                </div>
                {friends.map((friend) => (
                <div className='shadow-slate-900 shadow-sm p-2 ' key={friend.id}>
                  <div className='flex'>
                    <img src={"/images/" + friend.u.avt} className="mx-auto ml-0 w-10 h-10  rounded-md" alt="" />
                    <button className='font-semibold text-sm' id={friend.id}>Chat<i className="fa-solid fa-plus pl-2"></i></button>
                  </div>
                  <p className='text-sm mt-3 mb-0'><strong>{friend.u.name}</strong></p>
                </div>
                ))}

              </div>

            </div>
          </div>
          :
          <AlertLogin />
      }
    </div>
  )
}
