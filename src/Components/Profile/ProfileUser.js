import React, { useEffect, useState } from 'react';
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


export default function ProfileUser(props) {
  const { isLoggedIn } = props
  const [nodes, setNodes] = useState([]);
  const str = document.cookie;
    const id = str.substring(3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /////
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const openModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };
  
  ////////
  const [change, setChange] = useState('');


  const handleChangePassword = async (e) => {
    const str = document.cookie;
    const id = str.substring(3);
    apiGeneral({ url: `/api/changepass`, params: { id, change }, method: "put" })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Change password Success',
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(function () {
          window.location.href = "/ProfileUser";
        }, 5000);

      })
      .catch(error => console.error(error));
    setChange("");

    console.log(id, change);

  }

  ////// edit information
  ////////////////////
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDOB] = useState('');

  /////////////////////
  const handleEditInfor = async (e) => {
    const str = document.cookie;
    const id = str.substring(3);
    apiGeneral({ url: `/api/user`, params: { id, name, email, address, phone,sex,dob }, method: "put" })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Edit information success',
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(function () {
          window.location.href = "/ProfileUser";
        }, 5000);

      })
      .catch(error => console.error(error));

  }

///////////////////
  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);

    apiGeneral({ url: `/api/user/${params}` })
      .then(data => {
        setNodes(data.data)
        const user = data.data[0].n
        setName(user.name)
        setEmail(user.email)
        setAddress(user.address)
        setPhone(user.phone)
        setSex(user.sex)
        setDOB(user.dob)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  return (
    <div>
      {
        isLoggedIn ?
          <div className='user pb-20 text-white bg-slate-900 '>
            <div className='bg-slate-200 py-4'>
              <div className=' text-end pr-10'>
                <button type="submit" onClick={openModalEdit}
                  className="text-white shadow-sm shadow-slate-400 bg-slate-700 hover:bg-slate-800 font-medium rounded-md text-sm   px-5 py-1 text-center">Edit Information
                </button>
                <a href='/EditProfilePet'
                  className="text-white shadow-sm shadow-slate-400 bg-slate-700 hover:bg-slate-800 font-medium rounded-md text-sm ml-4  px-5 py-1 text-center mr-3">Add Pet</a>
                
                <a href='/ProfilePet'
                  className="text-white shadow-sm shadow-slate-400 bg-slate-700 hover:bg-slate-800 font-medium rounded-md text-sm ml-4  px-5 py-1 text-center mr-3">Profile Pet</a>

                  <Link to={`/PersonalPage/${id}`}
                  className="text-white shadow-sm shadow-slate-400 bg-slate-700 hover:bg-slate-800 font-medium rounded-md text-sm ml-4  px-5 py-1 text-center mr-3">Edit Post</Link>
              </div>
            </div>
            {
              nodes.map((node) => (

                <div className='container pt-10 lg:flex justify-around' key={node.id}>
                  <div className=' shadow-sm  shadow-slate-400 bg-slate-800 w-11/12 mx-auto lg:w-1/4 text-center rounded-md'>
                    <div className='py-10'>
                      <img src={"/images/" + node.n.avt} className="mx-auto  w-40 h-40 shadow-md rounded-full shadow-slate-400" alt="" />
                    </div>
                    <div className='pb-16'>
                      <h5>{node.n.name}</h5>
                    </div>
                    <div className='pb-5 flex-col justify-end'>
                      <button type="button" onClick={openModal}
                        className="text-white shadow-sm shadow-slate-400 hover:bg-slate-00 font-medium rounded-full text-sm   px-5 py-1 text-center">Change Password</button>
                    </div>
                  </div>
                  <div className=' shadow-sm shadow-slate-400 bg-slate-800 w-11/12 mx-auto mt-10 lg:mt-0 lg:w-2/4  rounded-md py-10 '>
                    <div className='text-center'>
                      <h5>Information</h5>
                      <div className='border-2 border-solid border-slate-700 mb-5'></div>
                    </div>
                    <div className='flex justify-center'>
                      <ul className='item-left'>
                        <li>
                          <p> Name </p>
                        </li>
                        <li>
                          <p>Gender </p>
                        </li>
                        <li>
                          <p>D.O.B </p>
                        </li>
                        <li>
                          <p>Address </p>
                        </li>
                        <li>
                          <p>Phone </p>
                        </li>
                        <li>
                          <p>Email </p>
                        </li>
                      </ul>
                      <ul className='pl-10'>
                        <li>
                          <p>{node.n.name}</p>
                        </li>
                        <li>
                          <p>{node.n.sex}</p>
                        </li>
                        <li>
                          <p>{node.n.dob}</p>
                        </li>
                        <li>
                          <p>{node.n.address}</p>
                        </li>
                        <li>
                          <p>{node.n.phone}</p>
                        </li>
                        <li>
                          <p>{node.n.email}</p>
                        </li>
                      </ul>
                    </div>

                    
                  </div>
                  
                  {/* Modal Change Password */}
                  <div className={`fixed backdrop-blur-sm top-0 left-0 w-full h-full flex items-center justify-center ${isModalOpen ? "" : "hidden"}`}>
                    <div className="absolute bg-gray-500" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                      <div>
                        <button onClick={closeModal} className="text-slate-900 text-2xl ml-90p">
                          <i className="fa-solid fa-circle-xmark "></i>
                        </button>

                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input type="email" value={node.n.email} readOnly
                            name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="user@gmail.com" />
                        </div>
                        <div className='mt-3'>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                          <input type="password" value={node.n.pass}
                            name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" readOnly />
                        </div>
                        <div className='mt-3'>
                          <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                          <input type="password" value={change} onChange={(event) => setChange(event.target.value)}
                            name="newpassword" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$"
                            placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>


                        <div className='mt-3 text-end'>
                          <button onClick={handleChangePassword}
                            className="text-white bg-slate-900 font-medium rounded-full text-sm   px-5 py-1 text-center">Save</button>
                          <button onClick={closeModal}
                            className="text-white bg-slate-900 font-medium rounded-full text-sm ml-5 px-5 py-1 text-center">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* // */}
                  {/* Modal Edit Information*/}
                  <div className={`fixed backdrop-blur-sm  top-0 left-0 w-full h-full flex items-center justify-center ${isModalEditOpen ? "" : "hidden"}`}>
                    <div className="absolute bg-gray-500" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                      <div>
                        <button onClick={closeModalEdit} className="text-slate-900 text-2xl ml-90p">
                          <i className="fa-solid fa-circle-xmark "></i>
                        </button>

                        <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                          <input type="text" value={name} onChange={(event) => setName(event.target.value)}
                            name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Trâm Trâm" required />
                        </div>

                        <div className='mt-3'>
                          <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                          <select value={sex} onChange={(event) => setSex(event.target.value)}
                            className="bg-gray-50 border border-slate-600 text-gray-900 text-xs rounded-full block w-full px-2.5">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>

                        <div className='mt-3'>
                          <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">D.O.B</label>
                          <input type="text" value={dob} onChange={(event) => setDOB(event.target.value)}
                            name="dob" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <div>
                          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                          <input type="address" value={address} onChange={(event) => setAddress(event.target.value)}
                            name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="user@gmail.com" required />
                        </div>

                        <div className='mt-3'>
                          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                          <input type="phone" value={phone} onChange={(event) => setPhone(event.target.value)}
                            name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}
                            name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="user@gmail.com" required />
                        </div>

                        <div className='mt-3 text-end'>
                          <button type="submit" onClick={handleEditInfor}
                           className="text-white bg-slate-900 font-medium rounded-full text-sm   px-5 py-1 text-center">Save</button>
                          <button type="submit" onClick={closeModalEdit}
                            className="text-white bg-slate-900 font-medium rounded-full text-sm ml-5 px-5 py-1 text-center">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* // */}
                </div>
              ))}
             
          </div>
          :
          <AlertLogin />
      }
    </div>
  )
}
