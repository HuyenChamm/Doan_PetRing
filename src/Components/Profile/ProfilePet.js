import React, { useEffect, useRef, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';
import Swal from 'sweetalert2';

export default function ProfilePet(props) {
  const { isLoggedIn } = props
  const [nodes, setNodes] = useState([]);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [desc, setDescription] = useState('');

  //Xu ly chon file avt
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }

  };
  const img = selectedFile;

  /////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  ///
  const handleEditInfor = async (e) => {
    const str = document.cookie;
    const id = str.substring(3);
    apiGeneral({ url: `/api/user`, params: { id }, method: "put" })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Edit information success',
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(function () {
          window.location.href = "/ProfilePet";
        }, 5000);

      })
      .catch(error => console.error(error));

  }
  //////

  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);
    apiGeneral({ url: `/api/pet/${params}` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      {
        isLoggedIn ?
          <div className='profilepet bg-slate-900 text-white'>
            {
              nodes.map((node) => (
                <div className='container pt-24 md:pt-32 pb-4' key={node.idpet}>
                  <div className='py-4 bg-slate-800 rounded-md'>
                    <img src={"/images/" + node.pet.img} className='w-24 h-24 md:w-32 md:h-32 rounded-full ml-10 -mt-16 border-solid border-4 border-white' alt="" />
                    <div className='block md:flex justify-between px-12'>

                      <div className=' pt-5'>
                        <div>
                          <h4>{node.pet.name}</h4>
                          <p>{node.pet.desc}</p>
                        </div>
                        <div className=''>
                          <button type="submit" className='px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400'>Follow <i className="fa-solid fa-plus"></i></button>
                          <button type="submit" onClick={openModal}
                            className='px-4 py-1  ml-3 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400'>Edit Information <i className="fa-solid fa-plus"></i></button>
                        </div>
                      </div>

                      <div className='flex pt-5 md:block'>
                        <div className='hover:bg-slate-900 px-2 md:px-10 py-3'>
                          <p className='mb-0'>0 Follower</p>
                        </div>
                        <div className='hover:bg-slate-900 px-2 md:px-10 py-3'>
                          <p className='mb-0'>10 Like</p>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className='bg-slate-800 border-solid border-2 border-slate-900 mt-5 py-8 rounded-md px-8 md:px-12 '>
                    <div className='flex'>
                      <img src={"/images/" + node.pet.img} className='w-16 h-16 mb-5 rounded-full' alt="" />
                      <div className='pl-8 font-bold pt-5'><p>{node.pet.name}</p></div>
                    </div>
                    <div className='text-sm md:text-base'>
                      <p>
                        Hello! My name is <span>{node.pet.name}</span>. I'm a <span>{node.pet.type}</span>. My weight is <span>{node.pet.weight}</span>. Now, I'm <span>{node.pet.age}</span>
                      </p>
                    </div>


                    <div className='bg-slate-900 py-16 rounded-md'>
                      <img src="/images/bgprofilepet.png" className='m-auto' alt="" />
                      <img src={"/images/" + node.pet.img} className='w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto -mt-32 hover:scale-125 transition duration-300 ease-in-out ' alt="" />
                      <div className='text-center  pt-10 md:text-h5'>
                        <p><strong> Welcome {node.pet.name} !</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Edit Information */}
                  <div className={`fixed backdrop-blur-sm  top-0 left-0 w-full h-full flex items-center justify-center ${isModalOpen ? "" : "hidden"}`}>
                    <div className="absolute bg-gray-500 " onClick={closeModal}></div>
                    <div className="bg-white rounded-lg p-8 w-full max-w-md text-slate-900">
                      <div>
                        <button onClick={closeModal} className=" text-2xl ml-90p">
                          <i className="fa-solid fa-circle-xmark "></i>
                        </button>
                        <h5>Edit Information Pet</h5>

                        <div className="relative z-0 w-full mb-6 group">
                          <input type="text" value={name} onChange={(event) => setName(event.target.value)}
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                          
                          <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>



                        <div className="relative z-0 w-full mb-6 group">
                          <input type="number" value={age} onChange={(event) => setAge(event.target.value)}
                            className="age block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                          <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                        </div>



                        <div className="relative z-0 w-full mb-6 group">
                          <input type="number" value={weight} onChange={(event) => setWeight(event.target.value)}
                            min="0" step="any" pattern="[0-9]+([\.][0-9]+)?" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder="                  Unit of measurement is kilogram!" required />
                          <label className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight</label>
                        </div>


                        <div className="relative z-0 w-full mb-6 group">
                          <textarea value={desc} onChange={(event) => setDescription(event.target.value)}
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                          <label className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        </div>


                        <div className="relative z-0 w-full mb-6 grid">
                          {/* <input type="text" value={gender} onChange={(event) => setGender(event.target.value)}  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required /> */}
                          <label htmlFor="gender" className="text-sm">Type of pet</label>

                          <select value={type} onChange={(event) => setType(event.target.value)} className='bg-transparent text-sm border-solid border-2 border-slate-700 mt-2' >
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">

                          <div className=''>
                            <div className='flex items-center'>
                              <p onClick={handleFileSelect}
                                className='mr-5 w-14 h-10 flex justify-center items-center border-2 border-solid border-slate-800 rounded-md'>
                                +
                              </p>
                              <p className='text-sm '>Upload Image</p>
                            </div>
                            <div>
                              <input typeof='file' accept=".jpg, .jpeg, .png, .gif" ref={inputRef} onChange={handleInputChange} className='hidden' type="file" />
                              {selectedFile && (
                                <p className='text-xs mb-0 mt-1'>{`${selectedFile.name} `}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          :
          <AlertLogin />
      }
    </div>
  )
}
