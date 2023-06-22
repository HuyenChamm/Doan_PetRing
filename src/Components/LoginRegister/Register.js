import React, { useRef, useState } from 'react';
import neo4j from 'neo4j-driver';
import Swal from 'sweetalert2';


export default function Register() {
  /////Connect Database 
  const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', '0366913115')
  );
  const session = driver.session();
  /////////Xu ly dang ki
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
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
  //Xu ly submit
  function handleSubmit(event) {
    event.preventDefault();
    session
      .run(
        `CREATE (u:User { 
          name:"${name}",
          email:"${email}",
          phone:"${phone}",
          address:"${address}",
          avt:"${selectedFile.name}",
          username: "${username}",
          pass: "${pass}",
          sex: "${gender}",
          dob:"${dob}"
        }) RETURN u`,
        { name, email, phone, address,  selectedFile, username, pass, gender,dob }
      )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Sign Up Success',
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(function(){
          window.location.href = "/Login";
        }, 5000);

      })
      .catch(error => console.error(error));
  }
  

  return (
    <div className='register min-h-664 w-full text-black'>
      <div className='container'>
        <div className='py-10 m-auto max-w-xs md:max-w-2xl'>
          <div className='border-solid border-2 p-14 border-white backdrop-blur-3xl rounded-2xl'>
            <div className='text-center text-white'>        
              <h3>Sign up</h3>  
            </div>
            <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User name</label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" value={address} onChange={(event) => setAddress(event.target.value)}  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
              </div>

            </div>
            <div className="grid md:grid-cols-2 md:gap-6"> 
              <div className="relative z-0 w-full mb-6 group">
                <input type="password" value={pass} onChange={(event) => setPass(event.target.value)} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'/>
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="password" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
              </div>
            </div>
          
            
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} pattern="[0][0-9]{9}" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                </div>
                <div className="relative z-0 w-full mb-6 grid">
                  {/* <input type="text" value={gender} onChange={(event) => setGender(event.target.value)}  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required /> */}
                  <label htmlFor="gender" className="text-sm">Gender</label>
                  
                  <select value={gender} onChange={(event) => setGender(event.target.value)} className='bg-transparent text-sm border-solid border-2 border-slate-700 mt-2 ' name="" id="">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                  <input type="date" value={dob} onChange={(event) => setDOB(event.target.value)} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-900 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                  <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">D.O.B</label>
                </div>
              <div className=''>
                <div className='flex items-center'>
                  <p onClick={handleFileSelect} 
                    className='mr-5 w-14 h-10 flex justify-center items-center border-2 border-solid border-slate-900 rounded-md'>
                    +
                  </p>
                  <p className='text-sm '>Upload Avatar</p>
                </div>
                <div>
                  <input typeof='file' accept=".jpg, .jpeg, .png, .gif" ref={inputRef} onChange={handleInputChange} className='hidden' type="file"/>
                  { selectedFile && (
                    <p className='text-xs mb-0 mt-1'>{`${selectedFile.name} `}</p>
                  )}
                </div>
              </div>
              </div>
              <div className='text-center'>
                <button type="submit" className="text-white bg-slate-900 border-solid  border-2 hover:bg-sky-900 font-medium rounded-full text-sm  w-auto px-16 md:px-20 py-2 my-5 text-center">Sign up</button> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
