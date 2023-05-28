import React, { useRef, useState } from 'react'
import apiGeneral from '../../../api/apiGeneral';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditProfilePet() {
   /////////Xu ly dang ki
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
   function handleSubmit(e) {
    const str = document.cookie;
    const id = str.substring(3);
    const imgp = img.name;
    e.preventDefault();
    apiGeneral({ url:`/api/pet`, params:{ id , name , age ,type , weight , desc ,imgp} , method:"post" })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Add Pet Success',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(function () {
        window.location.href = "/ProfilePet";
      }, 5000);

    })
    .catch(error => console.error(error));
 
    
   }
   ///////
   const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // navigate to the previous page
  };

  ///
  return (
    <div className='addpet min-h-664 w-full  '>
      <div className='container'>
      <div className='py-10 m-auto max-w-xs md:max-w-2xl '>
          <div className='border-solid border-2 p-14 border-white backdrop-blur-3xl bg-slate-900 rounded-2xl'>
            <div className='text-center text-orange-600'>        
              <h3>Add pet </h3>  
            </div>
            <form onSubmit={handleSubmit}>
           

              <div className="relative z-0 w-full mb-6 group">
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}  
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              </div>
              
            
              
              <div className="relative z-0 w-full mb-6 group">
                <input type="string"  value={age} onChange={(event) => setAge(event.target.value)}  
                  className="age block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
              </div>

            
             
              <div className="relative z-0 w-full mb-6 group">
                <input type="number"  value={weight} onChange={(event) => setWeight(event.target.value)}  
                min="0" step="any" pattern="[0-9]+([\.][0-9]+)?" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder="                  Unit of measurement is kilogram!"  required />
                <label  className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Weight</label>
              </div>
            
             
             <div className="relative z-0 w-full mb-6 group">
               <textarea  value={desc} onChange={(event) => setDescription(event.target.value)}   
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
               <label  className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
             </div>
           
                
                <div className="relative z-0 w-full mb-6 grid">
                  {/* <input type="text" value={gender} onChange={(event) => setGender(event.target.value)}  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-800 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required /> */}
                  <label htmlFor="gender" className="text-sm">Type of pet</label>
                  
                  <select value={type} onChange={(event) => setType(event.target.value)}  className='bg-transparent text-sm border-solid border-2 border-slate-700 mt-2' >
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
                  <input typeof='file' accept=".jpg, .jpeg, .png, .gif" ref={inputRef} onChange={handleInputChange} className='hidden' type="file"/>
                  {selectedFile && (
                    <p className='text-xs mb-0 mt-1'>{`${selectedFile.name} `}</p>
                  )}
                </div>
              </div>
              </div>
              <div className='text-center md:flex'>
                <button type="submit" className="text-white bg-slate-900 border-solid  border-2 hover:bg-slate-800 font-medium rounded-full text-sm  w-auto px-16 md:px-20 py-2 my-5 text-center mr-3">Add</button> 
                <div>
                  <button onClick={goBack} className='text-white bg-slate-900 border-solid  border-2 hover:bg-slate-800 font-medium rounded-full text-sm  w-auto px-16 md:px-20 py-2 my-5 text-center'>Back</button>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
