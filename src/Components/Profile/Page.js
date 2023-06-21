import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';
import { Link, useParams } from 'react-router-dom';
import PersonalPost from '../Post/PersonalPost';


export default function Page(props) {
  const { isLoggedIn } = props
  const [results, setResults] = useState([]);
  let { id } = useParams();

  console.log(useParams());
  useEffect(() => {
    apiGeneral({ url: `/api/personalpage/${id}` })
      .then(data => {
        setResults(data.data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  return (
    <div>
      {
        isLoggedIn ?
          <div className='personalPage text-slate-900'>
          
          {
          results.map(
            (result) => (
            <div className='container pb-80' key={result.id}>
              <div className=''>
                <div className='relative'>
                  <div className='bg-slate-800 h-40 rounded-b-md'></div>
                  <img src={"/images/" + result.n.avt} className="mx-auto ml-0 w-20 h-20 md:w-28 md:h-28 left-5 md:left-16 top-32 shadow-md rounded-full shadow-slate-400 absolute" alt="" />
                  <div className='block md:flex justify-between pt-6 '>
                    <div className='ml-28 -mt-3 md:mt-0 md:ml-48'>
                      <h6 className='mb-1'><strong> { result.n.name } </strong></h6>
                      <p>{result.n.address}</p>
                    </div>
                    <div className='mb-4 md:mb-0 flex'>
                    
                      <div>
                        <Link to={`/Pet/${result.id}`} className=' px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400'>Go to my Pet !</Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className='border border-solid  border-slate-500'></div>
              {/* <div>
          <ul className='flex border border-solid  border-slate-400 '>
            <li><a href="/ProfilePet">PET</a></li>
            <li><a href="/ProfileUser">Edit Information</a></li>
            <li><a href="/ListFriend">List Friends</a></li>
          </ul>
        </div> */}
        <PersonalPost id={result.id}/> 
            </div>
            ))} 
         
          </div>
         
          :
          <AlertLogin />
      }
    </div>
  )
}
