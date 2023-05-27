import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CheckLogin from '../LoginRegister/CheckLogin';
import apiGeneral from '../../api/apiGeneral';
import Search from './Include Function/Search';



export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn, handleLogout, socket } = props

  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    const str = document.cookie;
    const params = str.substring(3);


    apiGeneral({ url: `/api/user/${params}` })
      .then(data => {
        setNodes(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  ///
  const [isOpenUl, setIsOpenUl] = useState(false);

  const toggleDropdown = () => setIsOpenUl(!isOpenUl);

  return (
    <div className='header'>
      <nav className='bg-slate-900'>
        <div className='container'>
          <div className=' flex items-center justify-between'>

            <div className="flex items-center">
              <a href="/Advertisement"><img src="/images/petring.png" className=" w-16 h-10 md:w-28 md:h-14 " alt="" /></a>
            </div>

            <div className='hidden lg:block' >
              <ul className="flex items-center justify-center mb-0 mt-0 ml-0 text-sm">
                <li className='mb-0 lg:mx-4 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/">HOME</NavLink>
                </li>
                <li className='mb-0 lg:mx-4 font-bold flex hover:text-white'>
                  <button className={({ isActive }) => (isActive ? "link-active" : "link")} onClick={toggleDropdown}>
                    FRIEND
                  </button>
                  {isOpenUl && (
                    <ul className="absolute bg-slate-900 text-white p-4 top-12 text-xs -ml-7">
                      <li>
                        <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/ListFriend">
                          LIST FRIEND
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/Recommend">
                          RECOMMEND FRIEND
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/ListAccept">
                          FRIEND REQUEST
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li className='mb-0 lg:mx-4 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/ProfileUser">PROFILE</NavLink>
                </li>
                <li className='mb-0 lg:mx-4 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/Chat">MESSAGE</NavLink>
                </li>
                <li className='mb-0 lg:mx-4 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/Zoo">ZOO</NavLink>
                </li>
              </ul>
            </div>

            <div className='m-auto lg:hidden'>
              <ul className="flex mb-0">
                <li className='mb-0 mx-2 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/"> <i className="fa-solid fa-house mr-3 text-xs "></i></NavLink>
                </li>

                <li className='mb-0 mx-2 font-bold flex hover:text-white'>
                  <button className={({ isActive }) => (isActive ? "link-active" : "link")} onClick={toggleDropdown}>
                    <i className="fa-solid fa-users mr-3 text-xs  "></i>
                  </button>
                  {isOpenUl && (
                    <ul className="absolute bg-slate-900 text-white p-4 top-8 text-xs -ml-7">
                      <li>
                        <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/ListFriend">
                          LIST FRIEND
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/Recommend">
                          RECOMMEND FRIEND
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/ListAccept">
                          FRIEND REQUEST
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                <li className='mb-0 mx-2 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/ProfileUser"><i className="fa-solid fa-user mr-3 text-xs "></i></NavLink>
                </li>
                <li className='mb-0 mx-2 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/Chat"><i className="fa-solid fa-message  mr-3 text-xs"></i></NavLink>
                </li>
                <li className='mb-0 mx-2 font-bold flex hover:text-white'>
                  <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/Zoo "><i className="fa-solid fa-paw"></i></NavLink>
                </li>
              </ul>
            </div>
            <button type="button"
              className="block lg:hidden text-orange-400  hover:text-primaryd-300 focus:text-primaryd-300 focus:outline-none mr-7 absolute  right-1"
              onClick={() => setIsOpen(!isOpen)}>
              <i className="fa-sharp fa-solid fa-bars text-orange-400 "></i>
              <i className="fa-sharp fa-solid fa-xmark-large  text-orange-400 "></i>
            </button>
            <div className='hidden lg:flex items-center '>

              {/* <div className="flex">
                <div className='bg-orange-400  w-8 h-8 text-center'>
                  <i className="text-white fa-solid fa-magnifying-glass mt-2"></i>
                </div>
                <input type="text" className=" max-w-sm px-2 py-1 h-8 border border-solid  border-orange-400   text-sm leading-snug text-orange-400   shadow-none outline-none focus:outline-none font-normal rounded-r-full rounded-l-2xl flex-1  placeholder-orange-400 " placeholder="Search pink" />
              </div> */}
              <Search socket={socket} />
              {/* Check state login */}
              <CheckLogin isLoggedIn={isLoggedIn} handleLogout={handleLogout} />


            </div>
          </div>
          {/* Menu Responsive  */}
          <div className={`${isOpen ? "" : "hidden"} lg:hidden bg-primaryl-100 -mx-12 h-10000vh pl-13vw pr-13vw md:pl-7vw md:pr-7vw pt-14`}>
            {
              isLoggedIn ?
                <div>
                  {/* <div className="flex max-w-xs pb-7">
                    <div className='bg-orange-400  w-8 h-8 text-center'>
                      <i className="text-white fa-solid fa-magnifying-glass mt-2"></i>
                    </div>
                    <input type="text" className=" max-w-sm px-2 py-1 h-8 border border-solid  border-orange-400   text-sm leading-snug text-orange-400   shadow-none outline-none focus:outline-none font-normal rounded-r-full rounded-l-2xl flex-1  placeholder-orange-400 " placeholder="Search pink" />
                  </div> */}
                  <Search socket={socket} />
                  {
                    nodes.map((node) => (
                      <div className='pb-10 pt-4' key={node.id}>
                        <h4>{node.n.name}</h4>
                        <img src={"/images/" + node.n.avt} className="w-24 h-24 rounded-full border-solid border-2 border-orange-400 " alt="" />
                      </div>

                    ))}
                  <button type='button' onClick={handleLogout}
                    className='px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400 '>Logout
                    <i className="fa-solid fa-arrow-right-from-bracket pl-2"></i></button>
                </div>
                :
                <div>{/* Hiện khi chưa đăng nhập */}
                  <div>
                    <h6>Don't have an account yet? Sign up one for free! <a href='/Register'>Sign up now !</a></h6>
                  </div>
                  <div className='flex items-center my-5 lg:justify-center lg:m-5 lg:my-0 '>
                    <a href='/Login' className="px-4 py-1 rounded-l-sm text-orange-400 m-0 bg-white border-2 border-solid  border-orange-400   ">Login</a>
                    <a href="/Register" className="px-4 py-1 rounded-r-sm bg-orange-400  text-white border-2 border-solid  border-orange-400   ">Signup</a>
                  </div>
                </div>
            }








          </div>

        </div>
      </nav>
    </div>
  )
}

