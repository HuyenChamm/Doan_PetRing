import React, { useEffect, useState } from 'react'
import apiGeneral from '../../api/apiGeneral';
import { Link, useNavigate } from 'react-router-dom';

export default function Zoo(props) {

  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    apiGeneral({ url: `/api/zoo` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  //
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // navigate to the previous page
  };
  //////////////
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const socket = props.socket
  const handleSearch = (query) => {
    apiGeneral({ url: `/api/searchpet`, params: { query } })
      // .then(data => {
      //   // setResults (data.data);
      // })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    socket.on("searchpet", (data) => {
      setResults(data);
    })
  }, [])

  const handleQueryChange = (e) => {
    handleSearch(e.target.value);
    setQuery(e.target.value);
  }
  //////////
  return (
    <div>
      <div className='container my-10'>
        <div className='flex'>
          <div className='mr-5'>
            <button onClick={goBack}><i className="fa-solid fa-arrow-left-long"></i></button>
          </div>
          <div>
            <div className="flex">
              <div className='bg-orange-400  w-8 h-8 text-center'>
                <button onClick={handleSearch}><i className="text-white fa-solid fa-magnifying-glass mt-2"></i></button>
              </div>
              <input type="text" value={query} onChange={handleQueryChange}
                className=" max-w-sm px-2 py-1 h-8 border border-solid  border-orange-400  text-sm leading-snug text-orange-400   shadow-none outline-none focus:outline-none font-normal rounded-r-full rounded-l-2xl flex-1  placeholder-orange-400 " placeholder="Search pet ...." />
            </div>
            {/* result */}
            <ul className='bg-slate-900 absolute w-56 z-50 rounded-md text-slate-100 shadow-sm shadow-slate-700'>
              {
                results.length > 0 &&
                results.map(
                  result => <li className='pl-10 pt-2 mb-2 pb-3' key={result.id}>
                    <Link to={`/PetPage/${result.id}`} > {result.p.name} </Link>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className='text-center pb-4'><h2>ZOO <i className="fa-solid fa-paw"></i></h2></div>

        <div className='grid grid-cols-1 gap-y-8 md:grid-cols-2  lg:grid-cols-3'>
          {
            nodes.map((node) => (
              <div className='item relative' key={node.id}>
                <img src={"/images/" + node.p.img} className="w-90p h-80 rounded-md " alt="" />
                <div className='text-slate-900 absolute bottom-0 rounded-sm backdrop-blur-3xl w-90p'>
                  <div className='text-center pt-2'><p className='font-semibold mb-2'>{node.p.name}</p></div>
                  <div className='text-xs mx-2'>
                    <p className='mb-2'>
                      Hello! My name is <span>{node.p.name}</span>. I'm a <span>{node.p.type}</span>. My weight is <span>{node.p.weight}</span>. Now, I'm <span>{node.p.age}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
