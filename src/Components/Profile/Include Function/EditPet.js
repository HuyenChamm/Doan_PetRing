import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiGeneral from '../../../api/apiGeneral';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function EditPet() {
  const [nodes, setNodes] = useState([]);
  let { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [desc, setDescription] = useState('');
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // navigate to the previous page
  };
  ///
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
    const img = file.name;
  };
  const img = selectedFile;

  /////////

  const handleEditInfor = async (e) => {

    const imgp = img.name;
    apiGeneral({ url: `/api/pet/editpet`, params: { id, name, age, type, desc, weight, imgp }, method: "put" })
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

    apiGeneral({ url: `/api/pet/editpet/${id}` })
      .then(data => {
        setNodes(data.data);
        const pet = data.data[0].p
        setName(pet.name)
        setAge(pet.age)
        setType(pet.type)
        setWeight(pet.weight)
        setDescription(pet.desc)
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
    console.log(id);
  }, [])

  return (
    <div>
    <div className='container'>
                <button onClick={goBack} className='text-slate-900'><i class="fa-solid fa-backward"></i></button>
                </div>
          <div>
      <div className='container'>
        <div className="bg-white rounded-lg p-8 w-full max-w-md text-slate-900 mx-auto">
        

            <h5>Edit Information Pet</h5>

            <div className="relative z-0 w-full mb-6 group">
              <input type="text" value={name} onChange={(event) => setName(event.target.value)}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />

              <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>



            <div className="relative z-0 w-full mb-6 group">
              <input type="string" value={age} onChange={(event) => setAge(event.target.value)}
                className="age block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />
              <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
            </div>



            <div className="relative z-0 w-full mb-6 group">
              <input type="string" value={weight} onChange={(event) => setWeight(event.target.value)}
                min="0" step="any" pattern="[0-9]+([\.][0-9]+)?" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder="                  Unit of measurement is kilogram!" required />
              <label className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight</label>
            </div>


            <div className="relative z-0 w-full mb-6 group">
              <textarea value={desc} onChange={(event) => setDescription(event.target.value)}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
            </div>


            <div className="relative z-0 w-full mb-6 grid">
              {/* <input type="text" value={gender} onChange={(event) => setGender(event.target.value)}  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-700 peer" placeholder=" " required /> */}
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
                  <input typeof='file' accept=".jpg, .jpeg, .png, .gif" ref={inputRef} onChange={handleInputChange} className='hidden' type="file" required />
                  {selectedFile && (
                    <p className='text-xs mb-0 mt-1'>{`${selectedFile.name} `}</p>
                  )}
                </div>

               
              </div>

            </div>
            <div className='flex'>
                <div className='mt-3 text-end flex '>
                  <button type="submit" onClick={handleEditInfor}
                    className="text-white bg-slate-900 font-medium rounded-full text-sm   px-5 py-1 text-center">Save</button>

                  

                </div>
               
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}
