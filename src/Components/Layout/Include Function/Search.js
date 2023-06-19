import React, { useEffect, useState } from 'react'
import apiGeneral from '../../../api/apiGeneral';
import { Link } from 'react-router-dom';


export default function Search(props) {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const socket = props.socket;
  const handleSearch = (query) => {
    apiGeneral({ url:`/api/search`, params:{query}  })
    // .then(data => {
    //   // setResults (data.data);
    // })
    .catch(error =>{
      console.log(error);
    })

  }

  useEffect( ()=>{
  socket.on("search",(data) => {
    setResults (data);
  })
  },[])

  const handleQueryChange = (e) => {
    handleSearch(e.target.value);
    setQuery(e.target.value);
  }
  

  return (
    <div>
      <div className="flex">
        <div className='bg-orange-400  w-8 h-8 text-center'>
          <button  onClick={handleSearch}><i className="text-white fa-solid fa-magnifying-glass mt-2"></i></button>
        </div>
        <input type="text" value={query} onChange={ handleQueryChange }
        className=" max-w-sm px-2 py-1 h-8 border border-solid  border-orange-400  text-sm leading-snug text-orange-400   shadow-none outline-none focus:outline-none font-normal rounded-r-full rounded-l-2xl flex-1  placeholder-orange-400 " placeholder="Search user ...." />
      </div>
      {/* result */}
      <ul className='bg-slate-900 absolute w-56 z-50 rounded-md text-slate-100 shadow-sm shadow-slate-700'>
        {
          results.length > 0 && 
          results.map(
            result => <li className='pl-10 pt-2 mb-2 pb-3' key={result.id}>
              <Link to={`/PersonalPage/${result.id}`} > {result.u.name} </Link>
            </li> 
          )
        }
      </ul>
    </div>
  )
}
