import React from 'react'

export default function Advertisement() {
  return (
    <div className='quangcao text-slate-900'>
      <div className='container my-10'>

      

        <div className='petshop my-5'>
          <h5 className='my-5'>List of pet shops</h5>
          <div className='grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3 '>
          
            <div className='item relative shadow-3xl'>
              <img src="/images/shop_2.jpg"  className="mx-auto w-full h-96 rounded-md hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='absolute bottom-0 rounded-sm backdrop-blur-3xl w-full p-3 rounded-b-md'>
                <h6 className='mb-2'><strong>
                  Wind Fin Pet Shop
                </strong></h6>
                <div className='flex'>
                <div className='text-yellow-500 flex mr-2 mt-1'>
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                  <p className='mb-0'>5.0 by 48 peoples</p>
                </div>
              </div>
            </div>

            <div className='item relative shadow-3xl'>
              <img src="/images/shop_3.jpg"  className="mx-auto w-full h-96 rounded-md hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='absolute bottom-0 rounded-sm backdrop-blur-3xl w-full p-3 rounded-b-md'>
                <h6 className='mb-2'><strong>
                  Pet Grooming Salon
                </strong></h6>
                <div className='flex'>
                <div className='text-yellow-500 flex mr-2 mt-1'>
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                  <p className='mb-0'>5.0 by 48 peoples</p>
                </div>
              </div>
            </div>

            <div className='item relative shadow-3xl'>
              <img src="/images/shop_4.jpg"  className="mx-auto w-full h-96 rounded-md hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='absolute bottom-0 rounded-sm backdrop-blur-3xl w-full p-3 rounded-b-md'>
                <h6 className='mb-2 '><strong>
                Rainy Pet
                </strong></h6>
                <div className='flex'>
                <div className='text-yellow-500 flex mr-2 mt-1'>
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                  <p className='mb-0'>5.0 by 48 peoples</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='clinic my-5'>
          <h5 className='my-5'>List of veterinary clinics</h5>
          <div className='grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3'>
          <div className='item relative shadow-3xl'>
              <img src="/images/clinic_2.jpg"  className="mx-auto w-full h-80 rounded-md hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='absolute bottom-0 rounded-sm backdrop-blur-3xl w-full p-3 rounded-b-md'>
                <h6 className='mb-2 '><strong>
                Phòng Khám Thú Y - Pet Củ Chi
                </strong></h6>
                <div className='flex'>
                <div className='text-yellow-500 flex mr-2 mt-1'>
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                  <p className='mb-0'>5.0 by 48 peoples</p>
                </div>
              </div>
            </div>
            
            <div className='item relative shadow-3xl'>
              <img src="/images/clinic_5.jpg"  className="mx-auto w-full h-80 rounded-md hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='absolute bottom-0 rounded-sm backdrop-blur-3xl w-full p-3 rounded-b-md'>
                <h6 className='mb-2 '><strong>
                Thú Y Vina Pet
                </strong></h6>
                <div className='flex'>
                <div className='text-yellow-500 flex mr-2 mt-1'>
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                  <p className='mb-0'>5.0 by 48 peoples</p>
                </div>
              </div>
            </div>

            <div className='item relative shadow-3xl'>
              <img src="/images/clinic_6.jpg"  className="mx-auto w-full h-80 rounded-md hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='absolute bottom-0 rounded-sm backdrop-blur-3xl w-full p-3 rounded-b-md'>
                <h6 className='mb-2 '><strong>
                Dịch Vụ Thú Y Hồng Huy
                </strong></h6>
                <div className='flex'>
                <div className='text-yellow-500 flex mr-2 mt-1'>
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                  <p className='mb-0'>5.0 by 48 peoples</p>
                </div>
              </div>
            </div>

          </div>
          
        </div>

        <div className='sickness my-5'>
          <h5 className='my-5'>Common Pet Diseases</h5>
          <div className='grid grid-cols-1 gap-9 lg:grid-cols-2  '>

            <div className='item bg-slate-100  rounded-lg shadow-3xl'>
              <img src="/images/sick_1.jpg"  className="mx-auto w-full h-60 rounded-t-lg hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='m-4'>
                <p><strong>How to Treat Fungal Infections in Humans Effectively</strong></p>
                <p>
                Cat fungal disease in humans is a disease that is very common among cat owners. Feline thrush spreads quickly and needs to be treated carefully so as not to affect the appearance. Let's find out with Pety immediately the signs of cat fungus and effective treatment and care.
                </p>
              </div>
            </div>

            <div className='item bg-slate-100  rounded-lg shadow-3xl'>
              <img src="/images/sick_3.jpg"  className="mx-auto w-full h-60  rounded-t-lg hover:scale-95 transition duration-300 ease-in-out" alt="" />
              <div className='m-4'>
                <p><strong>Common Parasitic Diseases in Dogs and Cats</strong></p>
                <p>
                Learn about common parasitic diseases in dogs and cats and guide how to prevent diseases for dogs and cats.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
