import React from 'react'
import Slider from "react-slick"


export default function Slick() {

  var settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  return (
    <div className='py-10 '>
      <div className='container mx-auto '>
      <Slider {...settings}>
        <div className=' item px-8 '>
          <div className=' py-5 text-slate-900 bg-orange-100  rounded-xl'>
            <div className='flex justify-around'>
              <div className='font-semibold pb-5 '>
                <p className='mb-0'>Pet Name</p>
                <small className='font-normal'>Age pet</small>
              </div>
              <div>
                <i className="fa-solid fa-heart text-red-400" ></i>
              </div>
            </div>
            <img src="/images/pet_1.jpg" className='object-cover w-full h-48 mx-auto rounded-b-2xl -mb-6' alt="" srcset="" />
          </div>
        </div>
        <div className=' item px-8'>
          <div className=' py-5 text-slate-900 bg-orange-100  rounded-xl'>
            <div className='flex justify-around'>
              <div className='font-semibold pb-5 '>
                <p className='mb-0'>Pet Name</p>
                <small className='font-normal'>Age pet</small>
              </div>
              <div>
                <i className="fa-solid fa-heart text-red-400" ></i>
              </div>
            </div>
            <img src="/images/pet_2.jpg" className='object-cover w-full h-48 mx-auto rounded-b-2xl -mb-6' alt="" srcset="" />
          </div>
        </div>
        <div className=' item px-8 '>
          <div className=' py-5 text-slate-900 bg-orange-100  rounded-xl'>
            <div className='flex justify-around'>
              <div className='font-semibold pb-5 '>
                <p className='mb-0'>Pet Name</p>
                <small className='font-normal'>Age pet</small>
              </div>
              <div>
                <i className="fa-solid fa-heart text-red-400" ></i>
              </div>
            </div>
            <img src="/images/pet_3.jpg" className='object-cover w-full h-48 mx-auto rounded-b-2xl -mb-6' alt="" srcset="" />
          </div>
        </div>
        <div className=' item px-8 '>
          <div className=' py-5 text-slate-900 bg-orange-100  rounded-xl'>
            <div className='flex justify-around'>
              <div className='font-semibold pb-5 '>
                <p className='mb-0'>Pet Name</p>
                <small className='font-normal'>Age pet</small>
              </div>
              <div>
                <i className="fa-solid fa-heart text-red-400" ></i>
              </div>
            </div>
            <img src="/images/pet_4.jpg" className='object-cover w-full h-48 mx-auto rounded-b-2xl -mb-6' alt="" srcset="" />
          </div>
        </div>
        <div className=' item px-8'>
          <div className=' py-5 text-slate-900 bg-orange-100  rounded-xl'>
            <div className='flex justify-around'>
              <div className='font-semibold pb-5 '>
                <p className='mb-0'>Pet Name</p>
                <small className='font-normal'>Age pet</small>
              </div>
              <div>
                <i className="fa-solid fa-heart text-red-400" ></i>
              </div>
            </div>
            <img src="/images/pet_5.jpg" className='object-cover w-full h-48 mx-auto rounded-b-2xl -mb-6' alt="" srcset="" />
          </div>
        </div>
        <div className=' item px-8 '>
          <div className=' py-5 text-slate-900 bg-orange-100  rounded-xl'>
            <div className='flex justify-around'>
              <div className='font-semibold pb-5 '>
                <p className='mb-0'>Pet Name</p>
                <small className='font-normal'>Age pet</small>
              </div>
              <div>
                <i className="fa-solid fa-heart text-red-400" ></i>
              </div>
            </div>
            <img src="/images/pet_6.jpg" className='object-cover w-full h-48 mx-auto rounded-b-2xl -mb-6' alt="" srcset="" />
          </div>
        </div>
       
      </Slider>
      </div>
    </div>
  );
}
