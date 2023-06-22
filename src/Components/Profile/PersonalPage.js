import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import AlertLogin from '../AlertLogin';
import { Link, useParams } from 'react-router-dom';
import PersonalPost from '../Post/PersonalPost';
import PagePost from '../Post/PagePost';


export default function PersonalPage(props) {
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
                            <h6 className='mb-1'><strong> {result.n.name} </strong></h6>
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
                    <div className='border border-solid my-5  border-slate-500'></div>
                    <div className='shadow-sm py-10 pl-2 rounded-2xl mx-auto w-90p shadow-slate-900 bg-white'>
                      <div className='text-center font-semibold'><h5>Information</h5></div>
                      <div className=' border-solid  border-slate-200 border-2 mb-3'></div>
                      <div className='flex justify-center'>
                      <ul className='item-left font-bold'>
                        <li>
                          <p> Name: </p>
                        </li>
                        <li>
                          <p>Gender: </p>
                        </li>
                        <li>
                          <p>D.O.B :</p>
                        </li>
                      </ul>
                      <ul className='pl-5'>
                        <li>
                          <p>{result.n.name}</p>
                        </li>
                        <li>
                          <p>{result.n.sex}</p>
                        </li>
                        <li>
                          <p>{result.n.dob}</p>
                        </li>
                       
                      </ul>
                      <ul className='item-left font-bold pl-16'>
                       
                        <li>
                          <p>Address: </p>
                        </li>
                        <li>
                          <p>Phone: </p>
                        </li>
                        <li>
                          <p>Email: </p>
                        </li>
                      </ul>
                      
                      <ul className='pl-5'>
                       
                        <li>
                          <p>{result.n.address}</p>
                        </li>
                        <li>
                          <p>{result.n.phone}</p>
                        </li>
                        <li>
                          <p>{result.n.email}</p>
                        </li>
                      </ul>
                      </div>

                    </div>
                    {/* <div>
          <ul className='flex border border-solid  border-slate-400 '>
            <li><a href="/ProfilePet">PET</a></li>
            <li><a href="/ProfileUser">Edit Information</a></li>
            <li><a href="/ListFriend">List Friends</a></li>
          </ul>
        </div> */}
                    {/* <PersonalPost id={result.id}/> */}
                    <PagePost id={result.id} />
                  </div>
                ))}

          </div>

          :
          <AlertLogin />
      }
    </div>
  )
}
