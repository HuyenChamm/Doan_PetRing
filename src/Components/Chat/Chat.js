import React, { useEffect, useRef, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';


export default function Chat(props) {
  const { isLoggedIn, socket } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [nodeId, setNodeId] = useState(null);

  const [messs, setMess] = useState([]);
  // const [sends, setSend] = useState([]);
  // const [receives, setReceives] = useState([]);
  //////

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(function () {
      window.location.href = "/Chat";
    }, 500);
  };

  const handleClick = (e) => {
    const id = e.target.id;
    setNodeId(id);
    console.log(id, "click");
    setIsModalOpen(true);
  }
  const ID = nodeId
  console.log("nodeIDĐ", ID);
  ///////////
  useEffect(() => {
    const str = document.cookie;
    const id = str.substring(3);
    const idu = ID;
    console.log("iduuuuuuuuuuuuir", idu);
    apiGeneral({ url: `/api/chat`, params: { id, idu } })
      .then(data => {
        setMess(data.data);
        console.log(data, "getmess");
      })
      .catch(error => {
        console.log(error);
      })

    socket.on("sendmess", (data) => {
      setMess(oldData => [...oldData,data]);
      
    })

    console.log(id, idu, "chattttt");
    console.log(nodeId, "nodeId");

    /////////
    apiGeneral({ url: `/api/friend/${id}` })
      .then(data => {
        setFriends(data.data);
      })
      .catch(error => {
        console.log(error);
      })

  }, [ID])

  /////////////////Send message function
  const [messageInput, setMessageInput] = useState('');
  const timeRef = useRef(null);
  const sendMess = (e) => {
    const str = document.cookie;
    const id = str.substring(3);
    const idu = nodeId;
    const ID = idu;
    console.log("IDD ", ID);
    console.log(id, idu, "sendID");
    const currentTime = new Date().toLocaleString();
    timeRef.current = currentTime;
    console.log('Thời gian:', timeRef.current);
    const time = timeRef.current;

    apiGeneral({ url: `/api/chat`, params: { messageInput, id, idu, time }, method: "POST" })
      .catch(error => {
        console.log(error);
      })
    setMessageInput("");
  }
  ////////////
  return (
    <div className='chat bg-slate-100   text-slate-900'>
      {
        isLoggedIn ?
          <div>
            <div className='py-16 container md:flex justify-around'>
              <div className='left md:w-60p   border border-solid  border-slate-400 p-3 rounded-md'>
                <div>
                  <div className='flex mb-5'>
                    <div className='w-30p'>
                      <img src="/images/avt_1.jpg" className="mx-auto ml-0 w-12 h-12 shadow-md rounded-full shadow-slate-400" alt="" />
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

              {/* Friend */}
              <div className='right mt-10 md:mt-0 md:w-30p border border-solid  border-slate-400 p-3 rounded-md '>
                <div>
                  <div className="flex">

                    <button> <i className="text-slate-500 fa-solid fa-magnifying-glass text-xs pr-2"></i></button>

                    <input type="text" className=" text-xs border border-solid  hover:border-slate-200 " placeholder="  Search " />
                  </div>
                </div>
                <div className='mt-3'>
                  <p><strong>List Friend</strong></p>
                </div>
                {friends.map(
                  (friend) => (
                    <div className='shadow-slate-900 shadow-sm p-2 ' key={friend.id} id={friend.id}>
                      <div className='flex' id={friend.id}>
                        <img src={"/images/" + friend.u.avt} className="mx-auto ml-0 w-10 h-10  rounded-md" alt="" id={friend.id} />

                        <button onClick={handleClick}
                          className='font-semibold text-sm' id={friend.id}>
                          <p id={friend.id} >{friend.id}</p>
                          Chat
                          <i className="fa-solid fa-plus pl-2" id={friend.id}></i>
                        </button>

                      </div>
                      <p className='text-sm mt-3 mb-0'><strong>{friend.u.name}</strong></p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Modal Box Chat */}

            <div className={`fixed backdrop-blur-sm top-0 left-0 w-full h-full flex items-center justify-center ${isModalOpen ? "" : "hidden"}`}>
              <div className="absolute bg-gray-500" onClick={closeModal}></div>
              <div className="bg-white rounded-lg p-8 w-full max-w-800">
                <div>
                  <button onClick={closeModal} className="text-slate-900 text-2xl ml-90p">
                    <i className="fa-solid fa-circle-xmark "></i>
                  </button>

                  <div className='boxchat px-4 '>

                    <div className='mx-auto bg-gray-400 rounded-md h-550'>

                      <div className='py-5 px-3 flex'>
                        <img src="/images/pet_7.jpg" className='w-16 h-16 rounded-full' alt="img" />
                        <div className='pl-3 pt-5 font-bold '>
                          {/* <p>{mess.u2.name}</p> */}
                        </div>
                      </div>

                      <div className='message-content px-5 h-73p md:h-70p mb-8 overflow-y-auto '>
                        {messs.sort((a, b) => a.idm - b.idm).map((mess) => (
                          <div className='user-left py-3 flex justify-end ' key={mess.idm}>
                            <div className='bg-slate-200 w-60p lg:w-2/5 px-3 pt-1 pb-3 rounded-xl text-sm md:text-base'>

                              <p className='mb-0 ' key={mess.idm}>{mess.idm} {mess.m.message}
                                <span className='text-xs block'>{mess.m.send_at} </span>
                              </p>
                            </div>
                          </div>
                        ))}
                        
                      </div>

                      <div className='flex-col pb-10 -mt-5 mx-auto'>
                        <input type="text" value={messageInput} onChange={(event) => setMessageInput(event.target.value)}
                          name="" id="" className='w-4/6 md:w-10/12 lg:w-11/12 ml-3 rounded-lg' />
                        <button onClick={sendMess} >
                          <i className="fa-solid fa-paper-plane pl-3"></i>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* // */}
          </div>
          :
          <AlertLogin />
      }
    </div>
  )
}
