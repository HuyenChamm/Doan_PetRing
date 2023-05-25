import React from 'react'


export default function Footer() {
  return (
    <div className='footer bg-slate-900  py-10'>
      <div className='container'>
        <div className="md:flex md:justify-between">

          <div className=" mb-6 md:mb-0 md:w-1/2">
            <img src="/images/petring.png" className=" w-20 h-10 md:w-28 md:h-14 flex items-center" alt="Pet Ring Logo" />
          </div>

          <div className="flex justify-around md:w-1/2">
            <div className=''>
              <h2 className="mb-6  font-semibold  uppercase text-xs md:text-sm hover:text-white hover:tracking-widest">Home</h2>
              <ul className="">
                <li className="mb-4">
                  <a href="/Advertisement" className="hover:text-white text-xs md:text-sm">Advertisement</a>
                </li>
                <li>
                  <a href="/Chat" className="hover:text-white text-xs md:text-sm">Chat</a>
                </li>
              </ul>
            </div>
            <div className=' '>
              <h2 className="mb-6 text-xs md:text-sm font-semibold  uppercase hover:text-white hover:tracking-widest ">List Friend</h2>
              <ul className="">
                <li className="mb-4">
                  <a href="/Recommend" className="hover:text-white text-xs md:text-sm">Recommend</a>
                </li>
                <li>
                  <a href="/ListFriend" className="hover:text-white text-xs md:text-sm">List Friend</a>
                </li>
              </ul>
            </div>
            <div className=''>
              <h2 className="mb-6 font-semibold  uppercase text-xs md:text-sm hover:text-white hover:tracking-widest">Profile</h2>
              <ul className="">
                <li className="mb-4">
                  <a href="/ProfilePet" className="hover:text-white text-xs md:text-sm ">Pet</a>
                </li>
                <li>
                  <a href="/ProfileUser" className="hover:text-white text-xs md:text-sm">User</a>
                </li>
              </ul>
            </div>

          </div>

        </div>
        <div className="my-6 border-gray-200 border-solid border-t-2 sm:mx-auto lg:my-8" ></div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm  sm:text-center ">© 2023 <a href="aaa" className="hover:text-white">PET RING</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="aaa" className=" hover:text-white">
              <i className='fa-brands fa-facebook'></i>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="aaa" className=" hover:text-white">
              <i className='fa-brands fa-instagram'></i>
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="aaa" className=" hover:text-white">
              <i className="fa-brands fa-twitter"></i>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="aaa" className=" hover:text-white">
              <i className='fa-brands fa-github'></i>
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="aaa" className=" hover:text-white">
              <i className="fa-brands fa-dribbble"></i>
              <span className="sr-only">Dribbbel account</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
